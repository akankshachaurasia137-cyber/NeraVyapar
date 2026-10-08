from fastapi import APIRouter,Depends
from ..auth.jwt import get_current_user
from ..schemas.prediction import EmptyReturnRequest,DemandRequest
from ..services.prediction_service import empty_return_prediction,demand_prediction
router=APIRouter(prefix="/api/prediction",tags=["Prediction"])
@router.post("/empty-return")
def empty(data:EmptyReturnRequest,user=Depends(get_current_user)): return empty_return_prediction(**data.model_dump())
@router.post("/demand")
def demand(data:DemandRequest,user=Depends(get_current_user)): return demand_prediction(**data.model_dump())
