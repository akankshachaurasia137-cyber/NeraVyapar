from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from ..database import get_db
from ..auth.jwt import get_current_user
from ..schemas.analysis import TruckAnalysisRequest
from ..services.analysis_service import analyze_truck


router = APIRouter(
    prefix="/api/analysis",
    tags=["Truck Analysis"]
)


@router.post("/truck")
def analyze(
    data: TruckAnalysisRequest,
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return analyze_truck(
        db=db,
        **data.model_dump()
    )