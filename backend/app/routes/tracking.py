from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..auth.jwt import get_current_user
from ..schemas.tracking import LocationUpdate
from ..services.tracking_service import create, update, set_status

router = APIRouter(tags=["Tracking"])


@router.post("/trips")
def new_trip(
    booking_id: int,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return create(db, booking_id).__dict__


@router.post("/trips/{trip_id}/location")
def location(
    trip_id: int,
    data: LocationUpdate,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return update(db, trip_id, data).__dict__


@router.post("/trips/{trip_id}/status")
def status(
    trip_id: int,
    status: str,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return set_status(db, trip_id, status).__dict__
