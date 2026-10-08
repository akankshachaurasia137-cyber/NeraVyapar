from datetime import datetime,timezone
from sqlalchemy import ForeignKey ,Float ,DateTime
from sqlalchemy.orm import Mapped ,mapped_column
from ..database import Base

class Location(Base):
    __tablename__="locations"
    id:Mapped[int]=mapped_column(primary_key=True)
    trip_id: Mapped[int]=mapped_column(ForeignKey("trips.id"),index=True)
    lat: Mapped[float]=mapped_column(Float)
    lng: Mapped[float]=mapped_column(Float)
    eta_minutes: Mapped[int|None]=mapped_column(nullable=True)
    recorded_at: Mapped[datetime]=mapped_column(DateTime(timezone=True),default=lambda:datetime.now(timezone.utc))