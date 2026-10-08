from datetime import datetime ,timezone
from sqlalchemy import ForeignKey, String, DateTime, Float
from sqlalchemy.orm import Mapped, mapped_column
from ..database import Base

class Booking(Base):
    __tablename__="bookings"
    id:Mapped[int]=mapped_column(primary_key=True)
    load_id: Mapped[int]=mapped_column(ForeignKey("loads.id"),index=True)
    driver_id: Mapped[int]=mapped_column(ForeignKey("drivers.id"),index=True)
    status: Mapped[str]=mapped_column(String(30),default="HELD",index=True)
    held_until: Mapped[datetime|None]=mapped_column(DateTime(timezone=True),nullable=True)
    agreed_price: Mapped[float]=mapped_column(Float)
    created_at: Mapped[datetime]=mapped_column(DateTime(timezone=True),default=lambda:datetime.now(timezone.utc))
    confirmed_at:Mapped[datetime|None]=mapped_column(DateTime(timezone=True),nullable=True)
    