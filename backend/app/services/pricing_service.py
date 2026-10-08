from ..utils.distance import city_distance_km
def fair_price(pickup,drop,vehicle_type="open",weight_tons=1,demand_score=.5):
    distance=city_distance_km(pickup,drop); rate={"open":32,"closed":38,"refrigerated":55}.get(vehicle_type.lower(),35)
    price=distance*rate*(1+min(.3,demand_score*.25))*(1+min(.3,weight_tons/40))
    return {"distance_km":distance,"estimated_price":round(price,2),"range_low":round(price*.9,2),"range_high":round(price*1.1,2),"assumptions":"Prototype estimate using distance, vehicle type, weight and demand."}
