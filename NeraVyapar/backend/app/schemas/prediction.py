from pydantic import BaseModel
class EmptyReturnRequest(BaseModel): current_city:str; destination_city:str; days_until_available:int=1; capacity_tons:float
class DemandRequest(BaseModel): origin:str; destination:str; cargo_type:str; day_of_week:int=0
