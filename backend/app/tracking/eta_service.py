def estimate_eta(distance_km:float,avg_speed_kmph:float=40)->int: return round(distance_km/max(1,avg_speed_kmph)*60)
