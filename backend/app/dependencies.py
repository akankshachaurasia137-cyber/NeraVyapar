from fastapi import Depends,HTTPException,status
from sqlalchemy.orm import Session
from .database import get_db
from .auth.jwt import get_current_user
from .models.user import User

def db_session():
    return Depends(get_db)

def current_user(user=Depends(get_current_user)):
    return user
def require_roles(*roles):
    def checker(user :User =Depends(get_current_user)):
        if user.role not in roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permission")
        return user
    return checker