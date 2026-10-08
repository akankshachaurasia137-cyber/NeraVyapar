from fastapi import HTTPException
from ..models.payment import Payment
from ..payments.razorpay import create_order

def create(db,booking_id,amount):
    existing=db.query(Payment).filter(Payment.booking_id==booking_id).first()
    if existing: return existing
    order=create_order(amount)
    p=Payment(booking_id=booking_id,total_amount=amount,booking_amount=amount*.25,pickup_amount=amount*.25,destination_amount=amount*.50,status="PENDING",provider_order_id=order.get("id"))
    db.add(p); db.commit(); db.refresh(p); return p

def mark_paid(db,payment_id,provider_payment_id):
    p=db.get(Payment,payment_id)
    if not p: raise HTTPException(404,"Payment not found")
    p.provider_payment_id=provider_payment_id; p.status="PAID"; db.commit(); return p
