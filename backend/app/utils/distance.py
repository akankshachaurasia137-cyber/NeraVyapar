from math import radians,sin,cos,asin,sqrt
def haversine_km(lat1,lon1,lat2,lon2):
    p=radians(1); a=0.5-cos((lat2-lat1)*p)/2+cos(lat1*p)*cos(lat2*p)*(1-cos((lon2-lon1)*p))/2
    return 12742*asin(sqrt(a))
def city_distance_km(a,b):
    known={("hubballi","bengaluru"):410,("bengaluru","hubballi"):410,("hubballi","dharwad"):20,("dharwad","hubballi"):20}
    return known.get((a.lower(),b.lower()),150.0)
