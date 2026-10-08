from sqlalchemy import ForeignKey ,Float,Integer,String
from sqlalchemy.orm import Mapped,mapped_column
from ..database import Base

class Match(Base):
    __tablename__="matches"
    id: Mapped[int]=mapped_column(primary_key=True)
    load_id: Mapped[int]=mapped_column(ForeignKey("loads.id"),index=True)
    driver_id: Mapped[int]=mapped_column(ForeignKey("drivers.id"),index=True)
    score: Mapped[float]=mapped_column(Float)
    route_score: Mapped[float]=mapped_column(Float,default=0)
    capacity_score: Mapped[float]=mapped_column(Float,default=0)
    timing_score: Mapped[float]=mapped_column(Float,default=0)
    price_score: Mapped[float]=mapped_column(Float,default=0)
    vehicle_score: Mapped[float]=mapped_column(Float,default=0)
    trust_score: Mapped[float]=mapped_column(Float,default=0)
    explanation: Mapped[str]=mapped_column(String(1000),default="")
