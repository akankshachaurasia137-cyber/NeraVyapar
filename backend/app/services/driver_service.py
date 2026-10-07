from sqlalchemy.orm import Session
from fastapi import HTTPException

from ..models.driver import Driver
from ..models.user import User


def create(db: Session, user: User, data):
    if user.role != "driver":
        raise HTTPException(
            status_code=403,
            detail="Driver account required"
        )

    obj = Driver(
        user_id=user.id,
        **data.model_dump()
    )

    db.add(obj)
    db.commit()
    db.refresh(obj)

    return obj


def get(db: Session, user_id: int):
    return (
        db.query(Driver)
        .filter(Driver.user_id == user_id)
        .first()
    )


def get_by_id(db: Session, driver_id: int):
    return (
        db.query(Driver)
        .filter(Driver.id == driver_id)
        .first()
    )


def list_all(db: Session):
    return db.query(Driver).all()