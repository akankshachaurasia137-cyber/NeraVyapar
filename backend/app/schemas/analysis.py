from pydantic import BaseModel


class TruckAnalysisRequest(BaseModel):
    current_city: str
    destination_city: str
    capacity_tons: float
    vehicle_type: str = "open"
    cargo_type: str = "General"
    days_until_available: int = 1