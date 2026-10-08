from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

from .chatbot import chatbot


# ============================================================
# NERA VYAPAR — Multilingual Chatbot Demo Server
# ============================================================

app = FastAPI(
    title="NERA VYAPAR",
    description="Multilingual trade and logistics assistant for LoadBack",
    version="1.0.0",
)


# ============================================================
# Request Model
# ============================================================

class ChatRequest(BaseModel):
    message: str
    language: str | None = None
    user_id: str | None = None


# ============================================================
# Chat API
# ============================================================

@app.post("/api/chat")
def chat(data: ChatRequest):
    """
    Receives a chat message and sends it to the
    multilingual NERA VYAPAR chatbot engine.
    """

    return chatbot.handle(
        message=data.message,
        language=data.language,
        user_id=data.user_id or "web-user",
    )


# ============================================================
# Health Check
# ============================================================

@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "NERA VYAPAR",
    }


# ============================================================
# Web Chat Interface
# ============================================================

@app.get("/", response_class=HTMLResponse)
def home():

    return """
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<title>NERA VYAPAR</title>

<style>

/* =========================================================
   GLOBAL
========================================================= */

* {
    box-sizing: border-box;
}

body {

    margin: 0;

    min-height: 100vh;

    font-family:
        Inter,
        Arial,
        Helvetica,
        sans-serif;

    background:
        radial-gradient(
            circle at top right,
            rgba(234, 132, 25, 0.10),
            transparent 35%
        ),
        radial-gradient(
            circle at bottom left,
            rgba(255, 255, 255, 0.04),
            transparent 30%
        ),
        #08111d;

    color: #f8fafc;

}


/* =========================================================
   APP CONTAINER
========================================================= */

.app {

    width: 100%;

    min-height: 100vh;

    display: flex;

    justify-content: center;

    padding: 35px 18px;

}


.container {

    width: 100%;

    max-width: 900px;

}


/* =========================================================
   HEADER
========================================================= */

.header {

    display: flex;

    align-items: center;

    justify-content: space-between;

    margin-bottom: 18px;

    padding: 8px 4px;

}


.brand {

    display: flex;

    align-items: center;

    gap: 14px;

}


.logo {

    width: 52px;

    height: 52px;

    border-radius: 14px;

    display: flex;

    align-items: center;

    justify-content: center;

    background:
        linear-gradient(
            135deg,
            #ffffff,
            #e7e7e7
        );

    color: #0b1420;

    font-size: 26px;

    font-weight: 900;

    box-shadow:
        0 8px 30px rgba(0,0,0,0.25);

}


.brand-name {

    font-size: 24px;

    font-weight: 800;

    letter-spacing: 0.5px;

}


.brand-name span {

    color: #f59e0b;

}


.tagline {

    margin-top: 3px;

    color: #94a3b8;

    font-size: 12px;

    letter-spacing: 1.5px;

    text-transform: uppercase;

}


/* =========================================================
   STATUS
========================================================= */

.status {

    display: flex;

    align-items: center;

    gap: 7px;

    color: #94a3b8;

    font-size: 12px;

}


.status-dot {

    width: 8px;

    height: 8px;

    border-radius: 50%;

    background: #22c55e;

    box-shadow:
        0 0 10px rgba(34,197,94,0.7);

}


/* =========================================================
   CHAT CARD
========================================================= */

.chat-card {

    background:
        rgba(15, 23, 42, 0.94);

    border:

        1px solid

        rgba(148, 163, 184, 0.14);

    border-radius: 24px;

    overflow: hidden;

    box-shadow:
        0 25px 80px rgba(0,0,0,0.35);

}


/* =========================================================
   CHAT HEADER
========================================================= */

.chat-header {

    padding: 22px 24px;

    border-bottom:
        1px solid
        rgba(148, 163, 184, 0.10);

    background:
        linear-gradient(
            90deg,
            rgba(245,158,11,0.07),
            transparent
        );

}


.chat-title {

    font-size: 18px;

    font-weight: 700;

}


.chat-subtitle {

    margin-top: 5px;

    color: #94a3b8;

    font-size: 13px;

}


/* =========================================================
   CHAT AREA
========================================================= */

#chat {

    height: 480px;

    overflow-y: auto;

    padding: 24px;

    scroll-behavior: smooth;

}


/* Scrollbar */

#chat::-webkit-scrollbar {

    width: 6px;

}

#chat::-webkit-scrollbar-track {

    background: transparent;

}

#chat::-webkit-scrollbar-thumb {

    background: #334155;

    border-radius: 10px;

}


/* =========================================================
   MESSAGES
========================================================= */

.message {

    max-width: 78%;

    padding: 14px 17px;

    margin-bottom: 14px;

    border-radius: 16px;

    line-height: 1.55;

    font-size: 14px;

    white-space: pre-wrap;

    animation:
        messageIn 0.2s ease;

}


@keyframes messageIn {

    from {

        opacity: 0;

        transform: translateY(5px);

    }

    to {

        opacity: 1;

        transform: translateY(0);

    }

}


.bot {

    background:
        linear-gradient(
            135deg,
            #16323a,
            #122c34
        );

    border:
        1px solid
        rgba(245,158,11,0.08);

    margin-right: auto;

}


.user {

    background:
        linear-gradient(
            135deg,
            #334b70,
            #273d60
        );

    margin-left: auto;

}


/* =========================================================
   TYPING
========================================================= */

.typing {

    display: inline-flex;

    gap: 4px;

    align-items: center;

}


.typing span {

    width: 6px;

    height: 6px;

    background: #f59e0b;

    border-radius: 50%;

    animation:
        bounce 1.2s infinite;

}


.typing span:nth-child(2) {

    animation-delay: 0.15s;

}

.typing span:nth-child(3) {

    animation-delay: 0.3s;

}


@keyframes bounce {

    0%, 60%, 100% {

        transform: translateY(0);

        opacity: 0.5;

    }

    30% {

        transform: translateY(-4px);

        opacity: 1;

    }

}


/* =========================================================
   QUICK ACTIONS
========================================================= */

.quick-actions {

    display: flex;

    gap: 8px;

    flex-wrap: wrap;

    padding: 0 24px 18px;

}


.quick-btn {

    background: #111c2d;

    color: #cbd5e1;

    border:

        1px solid

        #26364d;

    padding: 9px 12px;

    border-radius: 20px;

    cursor: pointer;

    font-size: 12px;

    transition: 0.2s;

}


.quick-btn:hover {

    border-color: #f59e0b;

    color: #ffffff;

    background: #172337;

}


/* =========================================================
   INPUT AREA
========================================================= */

.input-area {

    padding: 18px 20px;

    border-top:

        1px solid

        rgba(148,163,184,0.10);

    background: #0b1524;

}


.input-row {

    display: flex;

    gap: 10px;

}


/* Language */

.language {

    width: 125px;

    background: #0d192a;

    color: #e2e8f0;

    border:

        1px solid

        #334155;

    border-radius: 12px;

    padding: 0 12px;

    outline: none;

    cursor: pointer;

}


/* Message */

#message {

    flex: 1;

    min-width: 0;

    background: #0d192a;

    color: white;

    border:

        1px solid

        #334155;

    border-radius: 12px;

    padding: 14px;

    outline: none;

    font-size: 14px;

}


#message:focus {

    border-color: #f59e0b;

    box-shadow:
        0 0 0 3px
        rgba(245,158,11,0.08);

}


#message::placeholder {

    color: #64748b;

}


/* Send */

.send {

    min-width: 95px;

    border: none;

    border-radius: 12px;

    background:
        linear-gradient(
            135deg,
            #f59e0b,
            #ea7c14
        );

    color: #111827;

    font-size: 14px;

    font-weight: 800;

    cursor: pointer;

    transition: 0.2s;

}


.send:hover {

    transform: translateY(-1px);

    box-shadow:
        0 8px 25px
        rgba(245,158,11,0.22);

}


.send:disabled {

    opacity: 0.5;

    cursor: not-allowed;

}


/* =========================================================
   FOOTER
========================================================= */

.footer {

    text-align: center;

    color: #64748b;

    font-size: 11px;

    margin-top: 14px;

}


.footer strong {

    color: #94a3b8;

}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 650px) {

    .app {

        padding: 15px 10px;

    }

    .brand-name {

        font-size: 20px;

    }

    .status {

        display: none;

    }

    #chat {

        height: 55vh;

        padding: 18px;

    }

    .message {

        max-width: 88%;

    }

    .input-row {

        flex-wrap: wrap;

    }

    .language {

        width: 100%;

        height: 46px;

    }

    #message {

        width: calc(100% - 105px);

    }

    .send {

        width: 95px;

    }

}

</style>

</head>


<body>


<div class="app">

<div class="container">


<!-- =====================================================
     HEADER
===================================================== -->

<div class="header">

    <div class="brand">

        <div class="logo">
            🚛
        </div>

        <div>

            <div class="brand-name">
                NERA <span>VYAPAR</span>
            </div>

            <div class="tagline">
                Smart Trade & Logistics Assistant
            </div>

        </div>

    </div>


    <div class="status">

        <div class="status-dot"></div>

        Online

    </div>

</div>


<!-- =====================================================
     CHAT CARD
===================================================== -->

<div class="chat-card">


<div class="chat-header">

    <div class="chat-title">
        NERA VYAPAR Assistant
    </div>

    <div class="chat-subtitle">
        English • हिन्दी • ಕನ್ನಡ
    </div>

</div>


<!-- CHAT -->

<div id="chat"></div>


<!-- QUICK ACTIONS -->

<div class="quick-actions">

    <button
        class="quick-btn"
        onclick="quickMessage('Find a return load from Bengaluru to Hubballi')"
    >
        🚛 Find Return Load
    </button>


    <button
        class="quick-btn"
        onclick="quickMessage('Check booking 2')"
    >
        📋 Check Booking
    </button>


    <button
        class="quick-btn"
        onclick="quickMessage('Track trip 1')"
    >
        📍 Track Trip
    </button>


    <button
        class="quick-btn"
        onclick="quickMessage('What is the price')"
    >
        💰 Pricing
    </button>

</div>


<!-- INPUT -->

<div class="input-area">

<div class="input-row">


<select
    id="language"
    class="language"
>

    <option value="">
        🌐 Auto
    </option>

    <option value="en">
        🇬🇧 English
    </option>

    <option value="hi">
        🇮🇳 हिन्दी
    </option>

    <option value="kn">
        🇮🇳 ಕನ್ನಡ
    </option>

</select>


<input
    id="message"
    type="text"
    autocomplete="off"
    placeholder="Ask NERA VYAPAR anything..."
>


<button
    id="send"
    class="send"
    onclick="sendMessage()"
>
    Send
</button>


</div>

</div>


</div>


<div class="footer">

    Powered by
    <strong>NERA VYAPAR</strong>
    • LoadBack Intelligence

</div>


</div>

</div>


<script>

/* =========================================================
   ELEMENTS
========================================================= */

const chat =
    document.getElementById("chat");

const input =
    document.getElementById("message");

const language =
    document.getElementById("language");

const sendButton =
    document.getElementById("send");


/* =========================================================
   ADD MESSAGE
========================================================= */

function addMessage(text, type) {

    const message =
        document.createElement("div");

    message.className =
        `message ${type}`;

    message.textContent =
        text;

    chat.appendChild(message);

    chat.scrollTop =
        chat.scrollHeight;

}


/* =========================================================
   TYPING INDICATOR
========================================================= */

function showTyping() {

    const typing =
        document.createElement("div");

    typing.id =
        "typing";

    typing.className =
        "message bot";

    typing.innerHTML = `
        <div class="typing">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    chat.appendChild(typing);

    chat.scrollTop =
        chat.scrollHeight;

}


function hideTyping() {

    const typing =
        document.getElementById("typing");

    if (typing) {

        typing.remove();

    }

}


/* =========================================================
   SEND MESSAGE
========================================================= */

async function sendMessage() {

    const text =
        input.value.trim();

    if (!text) {

        return;

    }


    /* User message */

    addMessage(
        text,
        "user"
    );


    input.value = "";

    sendButton.disabled = true;

    showTyping();


    try {

        const response =
            await fetch(
                "/api/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            message: text,

                            language:
                                language.value ||
                                null,

                            user_id:
                                "web-user"
                        })
                }
            );


        const data =
            await response.json();


        hideTyping();


        if (!response.ok) {

            addMessage(
                "Sorry, something went wrong. Please try again.",
                "bot"
            );

            console.error(data);

            return;

        }


        addMessage(
            data.reply ||
            "I couldn't generate a response.",
            "bot"
        );


    }

    catch (error) {

        hideTyping();

        console.error(error);

        addMessage(
            "⚠️ Unable to connect to NERA VYAPAR server.",
            "bot"
        );

    }

    finally {

        sendButton.disabled = false;

        input.focus();

    }

}


/* =========================================================
   QUICK MESSAGE
========================================================= */

function quickMessage(text) {

    input.value = text;

    sendMessage();

}


/* =========================================================
   ENTER KEY
========================================================= */

input.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


/* =========================================================
   WELCOME MESSAGE
========================================================= */

addMessage(
    "नमस्ते! 👋 मैं NERA VYAPAR हूँ — आपका स्मार्ट व्यापार और लॉजिस्टिक्स सहायक।\\n\\nYou can chat with me in English, हिन्दी or ಕನ್ನಡ.\\n\\nTry: “Find a return load from Bengaluru to Hubballi”",
    "bot"
);

</script>


</body>

</html>
"""