from sqlalchemy import ForeignKey, Float, String
from sqlalchemy.orm import Mapped, mapped_column
from ..database import Base

class Payment(Base):
    __tablename__="payments"
    id: Mapped[int]=mapped_column(primary_key=True)
    booking_id: Mapped[int]=mapped_column(ForeignKey("bookings.id"),index=True)
    total_amount: Mapped[float]=mapped_column(Float)
    booking_amount: Mapped[float]=mapped_column(Float,default=0)
    pickup_amount: Mapped[float]=mapped_column(Float,default=0)
    destination_amount: Mapped[float]=mapped_column(Float,default=0)
    status: Mapped[str]=mapped_column(String(30),default="PENDING")
    provider_order_id: Mapped[str|None]=mapped_column(String(120),nullable=True)
    provider_payment_id: Mapped[str|None]=mapped_column(String(120),nullable=True)