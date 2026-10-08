from ..models.driver import Driver
from ..models.truck import Truck
from ..utils.constants import MATCH_WEIGHTS
from ..utils.distance import city_distance_km
from ..utils.helpers import clamp

def rank_matches(db,load):
    rows=[]
    for d in db.query(Driver).all():
        trucks=db.query(Truck).filter(Truck.driver_id==d.id,Truck.available==True).all()
        for t in trucks:
            route=100 if load.pickup_city.lower() in (d.preferred_route or "").lower() or load.drop_city.lower() in (d.preferred_route or "").lower() else 60
            capacity=clamp((t.capacity_tons/load.weight_tons)*100) if load.weight_tons else 0
            timing=80
            price=clamp(100-abs(load.offered_price-max(1,city_distance_km(load.pickup_city,load.drop_city)*30))/max(1,load.offered_price)*100)
            vehicle=100 if not load.vehicle_type_required or load.vehicle_type_required.lower()==t.vehicle_type.lower() else 30
            trust=clamp(d.trust_score)
            score=sum([route*MATCH_WEIGHTS['route'],capacity*MATCH_WEIGHTS['capacity'],timing*MATCH_WEIGHTS['timing'],price*MATCH_WEIGHTS['price'],vehicle*MATCH_WEIGHTS['vehicle'],trust*MATCH_WEIGHTS['trust']])
            explanation=f"Route {route:.0f}%, capacity {capacity:.0f}%, timing {timing:.0f}%, price {price:.0f}%, vehicle {vehicle:.0f}%, trust {trust:.0f}%."
            rows.append({"driver_id":d.id,"load_id":load.id,"score":round(score,2),"route_score":route,"capacity_score":capacity,"timing_score":timing,"price_score":price,"vehicle_score":vehicle,"trust_score":trust,"explanation":explanation})
    return sorted(rows,key=lambda x:x['score'],reverse=True)
