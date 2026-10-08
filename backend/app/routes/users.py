from fastapi import APIRouter,Depends
from ..auth.jwt import get_current_user
from ..schemas.user import UserOut
router = APIRouter(tags=["Users"])
@router.get("/me",response_model=UserOut)
def me(user=Depends(get_current_user)): return user
