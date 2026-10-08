from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel, Field
from .chatbot import chatbot
from .whatsapp import verify_webhook, send_whatsapp_message

app = FastAPI(title="LoadBack Multilingual Chatbot", version="1.0.0")

class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    language: str | None = None
    user_id: str | None = None

@app.get("/")
def root():
    return {"service":"LoadBack Multilingual Chatbot","status":"running","languages":["en","hi","kn"]}

@app.get("/health")
def health():
    return {"status":"ok"}

@app.post("/api/chat")
def chat(data: ChatRequest):
    return chatbot.handle(data.message, data.language, data.user_id)

@app.get("/api/whatsapp/webhook")
async def whatsapp_verify(request: Request):
    p = request.query_params
    result = verify_webhook(p.get("hub.mode"), p.get("hub.verify_token"), p.get("hub.challenge"))
    if result is None:
        raise HTTPException(status_code=403, detail="Verification failed")
    return result

@app.post("/api/whatsapp/webhook")
async def whatsapp_webhook(request: Request):
    payload = await request.json()
    for entry in payload.get("entry", []):
        for change in entry.get("changes", []):
            for msg in change.get("value", {}).get("messages", []):
                if msg.get("type") != "text":
                    continue
                sender = msg.get("from")
                text = msg.get("text", {}).get("body", "")
                if sender and text:
                    result = chatbot.handle(text, user_id=sender)
                    await send_whatsapp_message(sender, result["reply"])
    return {"status":"ok"}
