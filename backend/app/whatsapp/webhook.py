from fastapi import APIRouter,Request
from ..config import settings
router=APIRouter()
@router.get("/webhook")
async def verify(mode:str|None=None,challenge:str|None=None,verify_token:str|None=None):
    if verify_token==settings.whatsapp_verify_token: return int(challenge or 0)
    return {"status":"verification failed"}
@router.post("/webhook")
async def webhook(request:Request): return {"status":"received","payload":await request.json()}
