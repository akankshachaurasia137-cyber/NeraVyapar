from ..utils.distance import city_distance_km
def score_route(origin,destination,historical_delay=.2,congestion=.2,weather=.1):
    distance=city_distance_km(origin,destination); risk=min(100, distance/10 + historical_delay*30 + congestion*25 + weather*25)
    return {"risk_score":round(risk,1),"risk_level":"HIGH" if risk>=60 else "MEDIUM" if risk>=35 else "LOW","distance_km":distance,"factors":{"historical_delay":historical_delay,"congestion":congestion,"weather":weather}}
