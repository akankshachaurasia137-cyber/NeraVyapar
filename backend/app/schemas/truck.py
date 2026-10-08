from pydantic import BaseModel, Field
class TruckCreate(BaseModel): vehicle_number:str; vehicle_type:str="open"; capacity_tons:float=Field(gt=0)
class TruckOut(TruckCreate): id:int; driver_id:int; available:bool; model_config={"from_attributes":True}
