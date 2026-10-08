from sqlalchemy.orm import Session
from fastapi import HTTPException
from ..models.truck import Truck
def create(db,driver_id,data):
    if db.query(Truck).filter(Truck.vehicle_number==data.vehicle_number).first(): raise HTTPException(409,"Vehicle number already exists")
    obj=Truck(driver_id=driver_id,**data.model_dump()); db.add(obj); db.commit(); db.refresh(obj); return obj
def list_for_driver(db,driver_id): return db.query(Truck).filter(Truck.driver_id==driver_id).all()
