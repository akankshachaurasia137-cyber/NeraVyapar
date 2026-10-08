from pydantic import BaseModel, Field
class MessageResponse(BaseModel): message: str
class Coordinates(BaseModel): lat: float; lng: float
