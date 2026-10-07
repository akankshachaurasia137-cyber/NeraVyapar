from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..auth.jwt import get_current_user
from ..services.booking_service import create_hold, confirm
from ..services.driver_service import get as get_driver
from ..schemas.booking import BookingCreate

router = APIRouter(tags=["Bookings"])


@router.post("/hold")
def hold(
    data: BookingCreate,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    driver = get_driver(db, user.id)

    if not driver or driver.id != data.driver_id:
        raise HTTPException(403, "Invalid driver")

    booking = create_hold(
        db,
        data.load_id,
        data.driver_id,
        data.agreed_price
    )

    return {
        "id": booking.id,
        "status": booking.status,
        "held_until": booking.held_until,
        "agreed_price": booking.agreed_price
    }


@router.post("/{booking_id}/confirm")
def confirm_booking(
    booking_id: int,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    booking = confirm(db, booking_id)

    return {
        "id": booking.id,
        "status": booking.status,
        "confirmed_at": booking.confirmed_at
    }
