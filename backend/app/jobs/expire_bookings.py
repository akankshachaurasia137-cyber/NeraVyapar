from ..database import SessionLocal
from ..services.booking_service import expire_holds
def run():
    db=SessionLocal()
    try: return expire_holds(db)
    finally: db.close()
