from fastapi import APIRouter,Depends
from ..auth.jwt import get_current_user
from ..services.pricing_service import fair_price
router=APIRouter(prefix="/api/pricing",tags=["Pricing"])
@router.get("/estimate")
def estimate(pickup:str,drop:str,vehicle_type:str="open",weight_tons:float=1,demand_score:float=.5,user=Depends(get_current_user)): return fair_price(pickup,drop,vehicle_type,weight_tons,demand_score)
