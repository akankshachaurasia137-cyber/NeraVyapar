from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..schemas.auth import RegisterRequest, LoginRequest, TokenResponse
from ..schemas.user import UserOut
from ..services.auth_service import register, login

router = APIRouter(tags=["Auth"])


@router.post("/register", response_model=UserOut)
def register_user(
    data: RegisterRequest,
    db: Session = Depends(get_db)
):
    return register(db, **data.model_dump())


@router.post("/login", response_model=TokenResponse)
def login_user(
    data: LoginRequest,
    db: Session = Depends(get_db)
):
    return {
        "access_token": login(db, data.phone, data.password),
        "token_type": "bearer"
    }