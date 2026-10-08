from datetime import datetime
from pydantic import BaseModel, Field
class LoadCreate(BaseModel):
    cargo_type:str
    weight_tons:float=Field(gt=0)
    pickup_city:str; drop_city:str
    pickup_lat:float|None=None; pickup_lng:float|None=None
    drop_lat:float|None=None; drop_lng:float|None=None
    pickup_time:datetime
    offered_price:float=Field(gt=0)
    vehicle_type_required:str|None=None
class LoadOut(LoadCreate): id:int; trader_id:int; status:str; model_config={"from_attributes":True}
