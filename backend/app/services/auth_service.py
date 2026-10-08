from sqlalchemy.orm import Session
from fastapi import HTTPException
from ..models.user import User
from ..auth.password import hash_password,verify_password
from ..auth.jwt import create_access_token

def register(db:Session,name,phone,password,role="driver",language="en"):
    if db.query(User).filter(User.phone==phone).first(): raise HTTPException(409,"Phone already registered")
    if role not in {"driver","trader","admin"}: raise HTTPException(400,"Invalid role")
    user=User(name=name,phone=phone,password_hash=hash_password(password),role=role,language=language)
    db.add(user); db.commit(); db.refresh(user); return user

def login(db:Session,phone,password):
    user=db.query(User).filter(User.phone==phone).first()
    if not user or not verify_password(password,user.password_hash): raise HTTPException(401,"Invalid phone or password")
    return create_access_token(user.id)
