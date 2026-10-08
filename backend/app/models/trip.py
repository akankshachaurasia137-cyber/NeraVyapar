from sqlalchemy import ForeignKey, String, Float
from sqlalchemy.orm import Mapped, mapped_column
from ..database import Base
class Trip(Base):
    __tablename__="trips"
    id: Mapped[int]=mapped_column(primary_key=True)
    booking_id: Mapped[int]=mapped_column(ForeignKey("bookings.id"),unique=True)
    status: Mapped[str]=mapped_column(String(30),default="DRIVER_ARRIVED")
    current_lat: Mapped[float|None]=mapped_column(Float,nullable=True)
    current_lng: Mapped[float|None]=mapped_column(Float,nullable=True)
    eta_minutes: Mapped[int|None]=mapped_column(nullable=True)
