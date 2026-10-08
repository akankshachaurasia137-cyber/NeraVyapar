from pydantic import BaseModel
class TripCreate(BaseModel): booking_id:int
class TripOut(BaseModel): id:int; booking_id:int; status:str; current_lat:float|None; current_lng:float|None; eta_minutes:int|None; model_config={"from_attributes":True}
