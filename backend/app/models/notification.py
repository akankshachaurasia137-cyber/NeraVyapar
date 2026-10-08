from datetime import datetime ,timezone
from sqlalchemy import ForeignKey ,String , Boolean,DateTime
from sqlalchemy.orm import Mapped ,mapped_column
from ..database import Base

class Notification(Base):
    __tablename__="notifications"
    id: Mapped[int]=mapped_column(primary_key=True)
    user_id: Mapped[int]=mapped_column(ForeignKey("users.id"),index=True)
    channel: Mapped[str]=mapped_column(String(30),default="IN_APP")
    title: Mapped[str]=mapped_column(String(150))
    message: Mapped[str]=mapped_column(String(1000))
    is_read: Mapped[bool]=mapped_column(Boolean,default=False)
    created_at: Mapped[datetime]=mapped_column(DateTime(timezone=True),default=lambda:datetime.now(timezone.utc))