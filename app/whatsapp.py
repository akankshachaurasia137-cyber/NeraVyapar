import os, hmac, httpx
from dotenv import load_dotenv
load_dotenv()

def verify_webhook(mode, token, challenge):
    expected = os.getenv("WHATSAPP_VERIFY_TOKEN", "loadback_verify_token")
    if mode == "subscribe" and token and hmac.compare_digest(token, expected):
        return challenge
    return None

async def send_whatsapp_message(to, text):
    token = os.getenv("WHATSAPP_ACCESS_TOKEN", "").strip()
    phone_id = os.getenv("WHATSAPP_PHONE_NUMBER_ID", "").strip()
    if not token or not phone_id:
        print(f"[WhatsApp DEMO] To {to}: {text}")
        return {"demo": True}

    url = f"https://graph.facebook.com/v21.0/{phone_id}/messages"
    headers = {"Authorization":f"Bearer {token}","Content-Type":"application/json"}
    body = {"messaging_product":"whatsapp","to":to,"type":"text","text":{"body":text}}
    async with httpx.AsyncClient(timeout=20) as client:
        r = await client.post(url, headers=headers, json=body)
    return r.json()
