from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..auth.jwt import get_current_user
from ..models.notification import Notification
router=APIRouter(prefix="/api/notifications",tags=["Notifications"])
@router.get("")
def notifications(user=Depends(get_current_user),db:Session=Depends(get_db)): return [n.__dict__ for n in db.query(Notification).filter(Notification.user_id==user.id).order_by(Notification.id.desc()).limit(50)]
