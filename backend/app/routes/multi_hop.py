from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..auth.jwt import get_current_user
from ..services.load_service import get_open
from ..services.multi_hop_service import build_hops
router=APIRouter(prefix="/api/multi-hop",tags=["Multi Hop"])
@router.get("/options")
def options(start_city:str,user=Depends(get_current_user),db:Session=Depends(get_db)): return build_hops(get_open(db),start_city)
