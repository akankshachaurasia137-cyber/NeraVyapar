from ..models.trader import Trader
def create(db,user,data):
    obj=Trader(user_id=user.id,**data.model_dump()); db.add(obj); db.commit(); db.refresh(obj); return obj
def get(db,user_id): return db.query(Trader).filter(Trader.user_id==user_id).first()
