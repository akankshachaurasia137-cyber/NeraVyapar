import pandas as pd 
import random
random.seed(42)
destination = ["Bengaluru","Mysuru","Tumakuru","Belagavi","Pune","Hyderabad","Chennai","Mumbai"]
vehical_type=['Open','Closed','Refrigerated']
cargo_type = ["Onion","Potato", "Cotton","Tomato", "Grains","Fruits"]
demand_level=['High','Medium','Low']
days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
season=['Normal','Festival','Onion','Potato']
data =[]
for i in range(5000):
    truck_capacity=random.choice([6,8,10,12,14,16,18,20])
    distance_km=random.randint(50,600)
    vehicle_type=random.choice(vehical_type)
    destination=random.choice(destination)
    day_of_week=random.choice(days)
    season=random.choice(season)
    available_loads = random.randint(0, 15)
    demand_level=random.choice(demand_level)
    historical_route_success=round(random.uniform(0.2,0.95),2)
    probability = 0.15
    if available_loads<=2:
        probability+=0.35
    elif available_loads<=5:
        probability+=0.15
    if demand_level=='Low':
        probability+=0.25
    elif demand_level=="Medium":
        probability+=0.10
    if historical_route_success<=0.4:
        probability+=0.25
    elif historical_route_success<=0.6:
        probability+=0.10
    if distance_km > 400:
        probability += 0.10
    probability += random.uniform(-0.10, 0.10)
    probability = max(0.05, min(probability, 0.95))
    empty_return = 1 if random.random() < probability else 0
    data.append([truck_capacity,distance_km,vehicle_type,destination,cargo_type,day_of_week,season,available_loads,demand_level,historical_route_success,
        empty_return])
    columns = ["truck_capacity","distance_km","vehicle_type","destination","cargo_type","day_of_week","season","available_loads","demand_level","historical_route_success",
    "empty_return"]
df = pd.DataFrame(data, columns=columns)
df.to_csv("ml/data/empty_return_data.csv",index=False)
print("Dataset created successfully!")
print()
print("Shape:", df.shape)
print()
print(df.head())
print()
print("Target distribution:")
print(df["empty_return"].value_counts())
