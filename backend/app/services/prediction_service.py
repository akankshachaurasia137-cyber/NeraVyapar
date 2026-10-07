from ..utils.distance import city_distance_km
def empty_return_prediction(current_city,destination_city,days_until_available,capacity_tons):
    distance=city_distance_km(current_city,destination_city)
    risk=min(0.95,max(0.05,0.35+(distance/1000)*0.35-days_until_available*0.08))
    return {"empty_return_probability":round(risk,3),"distance_km":distance,"risk_level":"HIGH" if risk>.65 else "MEDIUM" if risk>.35 else "LOW","recommended_action":"Find return load now" if risk>.5 else "Monitor available loads"}
def demand_prediction(origin,destination,cargo_type,day_of_week):
    base={"onion":.78,"potato":.72,"tomato":.69,"general":.55}.get(cargo_type.lower(),.5)
    weekend=.08 if day_of_week in (5,6) else 0
    score=min(.98,base+weekend)
    return {"demand_score":round(score,3),"demand_level":"HIGH" if score>.7 else "MEDIUM" if score>.45 else "LOW","origin":origin,"destination":destination,"cargo_type":cargo_type}
