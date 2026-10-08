from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth.jwt import get_current_user
from app.schemas.driver import DriverCreate, DriverOut
from app.services import driver_service


router = APIRouter(tags=["Drivers"])


@router.post("/", response_model=DriverOut)
def create_driver(
    data: DriverCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    existing = driver_service.get(db, user.id)

    if existing:
        raise HTTPException(
            status_code=409,
            detail="Driver profile already exists",
        )

    return driver_service.create(db, user, data)


@router.get("/")
def get_drivers(db: Session = Depends(get_db)):
    return driver_service.list_all(db)


@router.get("/{driver_id}", response_model=DriverOut)
def get_driver(
    driver_id: int,
    db: Session = Depends(get_db),
):
    driver = driver_service.get_by_id(db, driver_id)

    if not driver:
        raise HTTPException(
            status_code=404,
            detail="Driver not found",
        )

    return driver
