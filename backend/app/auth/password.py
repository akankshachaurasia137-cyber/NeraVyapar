from fastapi import HTTPException
from ..models.user import user
def ensure_owner(user:User,owner_id:int):
    if user.id!=owner_id: raise HTTPException(status_code=403,detail="Not authorized")