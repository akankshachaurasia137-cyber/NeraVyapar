from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..auth.jwt import get_current_user
from ..services.load_service import get_open
from ..services.pooling_service import find_pool_options
router=APIRouter(prefix="/api/pooling",tags=["Pooling"])
@router.get("/options")
def options(capacity_tons:float=16,user=Depends(get_current_user),db:Session=Depends(get_db)): return find_pool_options(get_open(db),capacity_tons)
