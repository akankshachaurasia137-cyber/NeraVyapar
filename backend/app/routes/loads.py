from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..auth.jwt import get_current_user
from ..services.trader_service import get as get_trader
from ..services.load_service import create, get, get_open
from ..schemas.load import LoadCreate, LoadOut

router = APIRouter(tags=["Loads"])


@router.post("", response_model=LoadOut)
def add(
    data: LoadCreate,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    trader = get_trader(db, user.id)

    if not trader:
        raise HTTPException(400, "Create trader profile first")

    return create(db, trader.id, data)


@router.get("", response_model=list[LoadOut])
def opens(db: Session = Depends(get_db)):
    return get_open(db)


@router.get("/{load_id}", response_model=LoadOut)
def one(
    load_id: int,
    db: Session = Depends(get_db)
):
    load = get(db, load_id)

    if not load:
        raise HTTPException(404, "Load not found")

    return load
