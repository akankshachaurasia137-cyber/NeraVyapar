from pydantic import BaseModel
class BookingCreate(BaseModel): load_id:int; driver_id:int; agreed_price:float
class BookingOut(BaseModel): id:int; load_id:int; driver_id:int; status:str; held_until:str|None; agreed_price:float
