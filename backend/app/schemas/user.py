from pydantic import BaseModel
class UserOut(BaseModel):
    id:int; name:str; phone:str; role:str; language:str; is_active:bool
    model_config={"from_attributes":True}
