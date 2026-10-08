import httpx
from ..config import settings
async def send_message(to,text):
    if not settings.whatsapp_access_token: return {"demo":True,"to":to,"text":text}
    url=f"https://graph.facebook.com/v20.0/{settings.whatsapp_phone_number_id}/messages"
    headers={"Authorization":f"Bearer {settings.whatsapp_access_token}"}
    data={"messaging_product":"whatsapp","to":to,"type":"text","text":{"body":text}}
    async with httpx.AsyncClient() as client:
        r=await client.post(url,headers=headers,json=data); r.raise_for_status(); return r.json()
