from fastapi import HTTPException
from ..models.trip import Trip
from ..models.location import Location
def create(db,booking_id):
    t=Trip(booking_id=booking_id); db.add(t); db.commit(); db.refresh(t); return t
def update(db,trip_id,data):
    t=db.get(Trip,trip_id)
    if not t: raise HTTPException(404,"Trip not found")
    t.current_lat=data.lat; t.current_lng=data.lng; t.eta_minutes=data.eta_minutes
    db.add(Location(trip_id=trip_id,lat=data.lat,lng=data.lng,eta_minutes=data.eta_minutes)); db.commit(); db.refresh(t); return t
def set_status(db,trip_id,status):
    t=db.get(Trip,trip_id)
    if not t: raise HTTPException(404,"Trip not found")
    t.status=status; db.commit(); db.refresh(t); return t
