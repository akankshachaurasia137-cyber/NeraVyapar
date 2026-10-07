from pydantic import BaseModel
class DriverCreate(BaseModel): license_number:str|None=None; preferred_route:str|None=None
class DriverOut(DriverCreate): id:int; user_id:int; trust_score:float; completed_trips:int; model_config={"from_attributes":True}
