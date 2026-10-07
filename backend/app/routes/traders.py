from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..auth.jwt import get_current_user
from ..services.trader_service import create, get
from ..schemas.trader import TraderCreate, TraderOut

router = APIRouter(tags=["Traders"])

@router.post("/profile", response_model=TraderOut)
def profile(
    data: TraderCreate,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return create(db, user, data)

@router.get("/me", response_model=TraderOut)
def me(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get(db, user.id)
