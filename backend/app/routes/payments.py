from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..auth.jwt import get_current_user
from ..schemas.payment import PaymentCreate
from ..services.payment_service import create,mark_paid
router=APIRouter(prefix="/api/payments",tags=["Payments"])
@router.post("/create")
def create_payment(data:PaymentCreate,user=Depends(get_current_user),db:Session=Depends(get_db)):
    p=create(db,data.booking_id,data.amount); return {"id":p.id,"status":p.status,"provider_order_id":p.provider_order_id,"split":{"booking":p.booking_amount,"pickup":p.pickup_amount,"destination":p.destination_amount}}
@router.post("/{payment_id}/paid")
def paid(payment_id:int,provider_payment_id:str,user=Depends(get_current_user),db:Session=Depends(get_db)): return {"status":mark_paid(db,payment_id,provider_payment_id).status}
