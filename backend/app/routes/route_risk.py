from fastapi import APIRouter,Depends
from ..auth.jwt import get_current_user
from ..services.route_risk_service import score_route
router=APIRouter(prefix="/api/route-risk",tags=["Route Risk"])
@router.get("/score")
def score(origin:str,destination:str,historical_delay:float=.2,congestion:float=.2,weather:float=.1,user=Depends(get_current_user)): return score_route(origin,destination,historical_delay,congestion,weather)
