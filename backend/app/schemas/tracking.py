from pydantic import BaseModel
class LocationUpdate(BaseModel): lat:float; lng:float; eta_minutes:int|None=None
