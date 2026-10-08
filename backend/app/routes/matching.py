from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..auth.jwt import get_current_user
from ..services.load_service import get
from ..services.matching_service import rank_matches
from ..schemas.match import MatchOut

router = APIRouter(tags=["Matching"])


@router.get("/load/{load_id}", response_model=list[MatchOut])
def matches(
    load_id: int,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    load = get(db, load_id)
    return rank_matches(db, load)[:20]
