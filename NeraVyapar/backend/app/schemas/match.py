from pydantic import BaseModel
class MatchOut(BaseModel):
    driver_id:int; load_id:int; score:float; route_score:float; capacity_score:float; timing_score:float; price_score:float; vehicle_score:float; trust_score:float; explanation:str
