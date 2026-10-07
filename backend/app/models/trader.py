from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from ..database import Base
class Trader(Base):
    __tablename__="traders"
    id: Mapped[int]=mapped_column(primary_key=True)
    user_id: Mapped[int]=mapped_column(ForeignKey("users.id"),unique=True,index=True)
    business_name: Mapped[str]=mapped_column(String(150))
    business_type: Mapped[str|None]=mapped_column(String(100),nullable=True)
