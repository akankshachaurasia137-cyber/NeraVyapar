from datetime import datetime,timedelta,timezone
from fastapi import HTTPException
from ..models.booking import Booking
from ..models.load import Load

def create_hold(db,load_id,driver_id,agreed_price):
    load=db.get(Load,load_id)
    if not load or load.status!="OPEN": raise HTTPException(409,"Load is not available")
    existing=db.query(Booking).filter(Booking.driver_id==driver_id,Booking.status.in_(["HELD","CONFIRMED"])).first()
    if existing: raise HTTPException(409,"Driver already has an active booking")
    now=datetime.now(timezone.utc); b=Booking(load_id=load_id,driver_id=driver_id,status="HELD",held_until=now+timedelta(minutes=30),agreed_price=agreed_price)
    load.status="HELD"; db.add(b); db.commit(); db.refresh(b); return b

def confirm(db,booking_id):
    b=db.get(Booking,booking_id)
    if not b: raise HTTPException(404,"Booking not found")
    if b.status!="HELD": raise HTTPException(409,"Booking is not held")
    if b.held_until and b.held_until<datetime.now(timezone.utc): b.status="EXPIRED"; db.get(Load,b.load_id).status="OPEN"; db.commit(); raise HTTPException(409,"Hold expired")
    b.status="CONFIRMED"; b.confirmed_at=datetime.now(timezone.utc); db.get(Load,b.load_id).status="BOOKED"; db.commit(); db.refresh(b); return b

def expire_holds(db):
    now=datetime.now(timezone.utc); items=db.query(Booking).filter(Booking.status=="HELD",Booking.held_until<now).all()
    for b in items: b.status="EXPIRED"; db.get(Load,b.load_id).status="OPEN"
    db.commit(); return len(items)
