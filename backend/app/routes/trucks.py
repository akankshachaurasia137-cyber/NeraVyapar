from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..auth.jwt import get_current_user
from ..services.driver_service import get as get_driver
from ..services.truck_service import create, list_for_driver
from ..schemas.truck import TruckCreate, TruckOut


router = APIRouter(tags=["Trucks"])


@router.post("/", response_model=TruckOut)
def add(
    data: TruckCreate,
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    driver = get_driver(db, user.id)

    if not driver:
        raise HTTPException(
            status_code=400,
            detail="Create driver profile first",
        )

    return create(db, driver.id, data)


@router.get("/", response_model=list[TruckOut])
def mine(
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    driver = get_driver(db, user.id)

    if not driver:
        return []

    return list_for_driver(db, driver.id)
