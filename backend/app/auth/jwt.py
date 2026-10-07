from datetime import datetime,timedelta,timezone
from jose import jwt,JWTError
from fastapi import Depends,HTTPException,status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from ..config import settings
from ..database import get_db
from ..models.user import User
oauth2_scheme=OAuth2PasswordBearer(tokenUrl="/api/auth/login")
ALGORITHM="HS256"
def create_access_token(user_id:int):
    exp=datetime.now(timezone.utc)+timedelta(minutes=settings.access_token_expire_minutes)
    return jwt.encode({"sub":str(user_id),"exp":exp},settings.secret_key,algorithm=ALGORITHM)
def get_current_user(token:str=Depends(oauth2_scheme),db:Session=Depends(get_db)):
    exc=HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid authentication credentials",headers={"WWW-Authenticate":"Bearer"})
    try: uid=int(jwt.decode(token,settings.secret_key,algorithms=[ALGORITHM]).get("sub"))
    except (JWTError,TypeError,ValueError): raise exc
    user=db.get(User,uid)
    if not user or not user.is_active: raise exc
    return user
