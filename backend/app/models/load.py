from datetime import datetime, timezone
from sqlalchemy import String, ForeignKey, Float, DateTime, Integer
from sqlalchemy.orm import Mapped, mapped_column
from ..database import Base

class Load(Base):
    __tablename__="loads"
    id:Mapped[int]=mapped_column(primary_key=True)
    trader_id: Mapped[int]=mapped_column(ForeignKey("traders.id"),index=True)
    cargo_type: Mapped[str]=mapped_column(String(100))
    weight_tons: Mapped[float]=mapped_column(Float)
    pickup_city: Mapped[str]=mapped_column(String(100),index=True)
    pickup_lat: Mapped[float|None]=mapped_column(Float,nullable=True)
    pickup_lng: Mapped[float|None]=mapped_column(Float,nullable=True)
    drop_city: Mapped[str]=mapped_column(String(100),index=True)
    drop_lat: Mapped[float|None]=mapped_column(Float,nullable=True)
    drop_lng: Mapped[float|None]=mapped_column(Float,nullable=True)
    pickup_time: Mapped[datetime]=mapped_column(DateTime(timezone=True))
    offered_price: Mapped[float]=mapped_column(Float)
    vehicle_type_required:Mapped[str|None]=mapped_column(String(50),nullable=True)
    status: Mapped[str]=mapped_column(String(30),default="OPEN",index=True)
    created_at: Mapped[datetime]=mapped_column(DateTime(timezone=True),default=lambda:datetime.now(timezone.utc))