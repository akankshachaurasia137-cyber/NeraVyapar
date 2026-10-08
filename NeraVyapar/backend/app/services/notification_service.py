from ..models.notification import Notification
def create(db,user_id,title,message,channel="IN_APP"):
    n=Notification(user_id=user_id,title=title,message=message,channel=channel); db.add(n); db.commit(); db.refresh(n); return n
