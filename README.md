# LoadBack Multilingual Chatbot

Standalone FastAPI chatbot for the LoadBack hackathon.

Languages: English, Hindi, Kannada.

## Run on Windows / VS Code

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8100
```

API:
- http://127.0.0.1:8100
- http://127.0.0.1:8100/docs
- POST /api/chat
- GET/POST /api/whatsapp/webhook

## Browser demo

```powershell
uvicorn app.dev_server:app --reload --port 8100
```

Open http://127.0.0.1:8100

## Test

```powershell
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8100/api/chat -ContentType "application/json" -Body '{"message":"Find a return load from Bengaluru to Hubballi"}'
```

Hindi:

```powershell
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8100/api/chat -ContentType "application/json" -Body '{"message":"बेंगलुरु से हुबली के लिए रिटर्न लोड खोजो"}'
```

Kannada:

```powershell
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8100/api/chat -ContentType "application/json" -Body '{"message":"ಬೆಂಗಳೂರುದಿಂದ ಹುಬ್ಬಳ್ಳಿಗೆ ರಿಟರ್ನ್ ಲೋಡ್ ಹುಡುಕಿ"}'
```

The bot is intentionally dependency-light and does not require a paid AI API.
It returns action codes such as SEARCH_RETURN_LOADS, CREATE_LOAD_DRAFT,
GET_BOOKING and GET_TRIP so the existing LoadBack FastAPI backend can handle
the real operations.

For WhatsApp Cloud API, copy `.env.example` to `.env` and set:
WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_VERIFY_TOKEN.

Meta needs a public HTTPS webhook; localhost alone cannot receive WhatsApp
webhooks.
