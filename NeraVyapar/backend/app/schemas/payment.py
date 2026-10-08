from pydantic import BaseModel
class PaymentCreate(BaseModel): booking_id:int; amount:float
class PaymentOut(BaseModel): id:int; booking_id:int; total_amount:float; booking_amount:float; pickup_amount:float; destination_amount:float; status:str; provider_order_id:str|None
