from fastapi import HTTPException
from ..models.load import Load
def create(db,trader_id,data):
    obj=Load(trader_id=trader_id,**data.model_dump()); db.add(obj); db.commit(); db.refresh(obj); return obj
def get_open(db): return db.query(Load).filter(Load.status=="OPEN").all()
def get(db,load_id):
    obj=db.get(Load,load_id)
    if not obj: raise HTTPException(404,"Load not found")
    return obj
