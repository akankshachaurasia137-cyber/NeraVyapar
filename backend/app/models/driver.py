from sqlalchemy import String, ForeignKey, Float, Integer
from sqlalchemy.orm import Mapped, mapped_column
from ..database import Base
class Driver(Base):
    __tablename__="drivers"
    id: Mapped[int]=mapped_column(primary_key=True)
    user_id: Mapped[int]=mapped_column(ForeignKey("users.id"),unique=True,index=True)
    license_number: Mapped[str|None]=mapped_column(String(80),nullable=True)
    preferred_route: Mapped[str|None]=mapped_column(String(200),nullable=True)
    trust_score: Mapped[float]=mapped_column(Float,default=50.0)
    completed_trips: Mapped[int]=mapped_column(Integer,default=0)
