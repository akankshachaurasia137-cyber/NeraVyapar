from pydantic import BaseModel
class TraderCreate(BaseModel): business_name:str; business_type:str|None=None
class TraderOut(TraderCreate): id:int; user_id:int; model_config={"from_attributes":True}
