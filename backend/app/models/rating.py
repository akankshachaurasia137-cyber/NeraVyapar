from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from ..database import Base
class Rating(Base):
    __tablename__="ratings"
    id: Mapped[int]=mapped_column(primary_key=True)
    booking_id: Mapped[int]=mapped_column(ForeignKey("bookings.id"))
    rater_user_id: Mapped[int]=mapped_column(ForeignKey("users.id"))
    rated_user_id: Mapped[int]=mapped_column(ForeignKey("users.id"))
    score: Mapped[int]=mapped_column(Integer)
    comment: Mapped[str|None]=mapped_column(String(500),nullable=True)
