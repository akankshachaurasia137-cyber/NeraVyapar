from sqlalchemy import String, ForeignKey, Float, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from ..database import Base
class Truck(Base):
    __tablename__="trucks"
    id: Mapped[int]=mapped_column(primary_key=True)
    driver_id: Mapped[int]=mapped_column(ForeignKey("drivers.id"),index=True)
    vehicle_number: Mapped[str]=mapped_column(String(30),unique=True,index=True)
    vehicle_type: Mapped[str]=mapped_column(String(50),default="open")
    capacity_tons: Mapped[float]=mapped_column(Float)
    available: Mapped[bool]=mapped_column(Boolean,default=True)
