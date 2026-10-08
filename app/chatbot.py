import re
from typing import Optional

TEXT = {
    "en": {
        "welcome": "Hi! 👋 I’m LoadBack Assistant.\n\nI can help you find return loads, create a load request, check booking status, track a trip, and understand pricing.\n\nTry: “Find a return load from Bengaluru to Hubballi”",
        "help": "I can help with:\n🚛 Find return loads\n📦 Create/load a shipment request\n🔎 Find matching trucks\n📋 Check booking status\n📍 Track a trip\n💰 Understand price/fare\n🌐 Change language",
        "return_load": "🚛 Please send the route like: “Bengaluru to Hubballi”.",
        "create_load": "📦 Tell me the cargo, weight in tons, pickup city and destination.",
        "booking": "📋 Send your booking ID. Example: “Check booking 2”",
        "tracking": "📍 Send your trip ID. Example: “Track trip 1”",
        "price": "💰 LoadBack ranks matches using route fit, capacity, timing, price, vehicle compatibility and trust score.",
        "fallback": "I need a little more detail.\n\nTry:\n• Find return load Hubballi to Bengaluru\n• 8 ton tomatoes Hubballi to Bengaluru\n• Check booking 2\n• Track trip 1",
        "thanks": "You're welcome! 🚛 Safe travels with LoadBack.",
    },
    "hi": {
        "welcome": "नमस्ते! 👋 मैं LoadBack Assistant हूँ।\n\nमैं रिटर्न लोड, लोड रिक्वेस्ट, बुकिंग स्टेटस, ट्रिप ट्रैकिंग और कीमत में मदद कर सकता हूँ।",
        "help": "मैं मदद कर सकता हूँ:\n🚛 रिटर्न लोड खोजें\n📦 लोड रिक्वेस्ट बनाएं\n🔎 सही ट्रक खोजें\n📋 बुकिंग स्टेटस देखें\n📍 ट्रिप ट्रैक करें\n💰 कीमत समझें",
        "return_load": "🚛 रूट भेजें। उदाहरण: “बेंगलुरु से हुबली”",
        "create_load": "📦 सामान, वजन, पिकअप शहर और डेस्टिनेशन बताएं।",
        "booking": "📋 बुकिंग ID भेजें। उदाहरण: “बुकिंग 2 चेक करो”",
        "tracking": "📍 ट्रिप ID भेजें। उदाहरण: “ट्रिप 1 ट्रैक करो”",
        "price": "💰 LoadBack रूट, क्षमता, समय, कीमत, वाहन और ट्रस्ट स्कोर के आधार पर मैच रैंक करता है।",
        "fallback": "थोड़ी और जानकारी चाहिए।\n\nउदाहरण:\n• हुबली से बेंगलुरु रिटर्न लोड खोजो\n• 8 टन टमाटर हुबली से बेंगलुरु\n• बुकिंग 2 चेक करो\n• ट्रिप 1 ट्रैक करो",
        "thanks": "आपका स्वागत है! 🚛 LoadBack के साथ सुरक्षित यात्रा।",
    },
    "kn": {
        "welcome": "ನಮಸ್ಕಾರ! 👋 ನಾನು LoadBack Assistant.\n\nರಿಟರ್ನ್ ಲೋಡ್, ಲೋಡ್ ರಿಕ್ವೆಸ್ಟ್, ಬುಕಿಂಗ್ ಸ್ಟೇಟಸ್ ಮತ್ತು ಟ್ರಿಪ್ ಟ್ರ್ಯಾಕಿಂಗ್‌ನಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಹುದು.",
        "help": "ನಾನು ಸಹಾಯ ಮಾಡಬಹುದು:\n🚛 ರಿಟರ್ನ್ ಲೋಡ್ ಹುಡುಕಿ\n📦 ಲೋಡ್ ರಿಕ್ವೆಸ್ಟ್ ಮಾಡಿ\n🔎 ಸೂಕ್ತ ಟ್ರಕ್ ಹುಡುಕಿ\n📋 ಬುಕಿಂಗ್ ಸ್ಟೇಟಸ್ ನೋಡಿ\n📍 ಟ್ರಿಪ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ\n💰 ಬೆಲೆ ತಿಳಿಯಿರಿ",
        "return_load": "🚛 ರೂಟ್ ಕಳುಹಿಸಿ. ಉದಾಹರಣೆ: “ಬೆಂಗಳೂರು ರಿಂದ ಹುಬ್ಬಳ್ಳಿ”",
        "create_load": "📦 ಸರಕು, ತೂಕ, ಪಿಕಪ್ ನಗರ ಮತ್ತು ಡೆಸ್ಟಿನೇಶನ್ ತಿಳಿಸಿ.",
        "booking": "📋 ಬುಕಿಂಗ್ ID ಕಳುಹಿಸಿ. ಉದಾಹರಣೆ: “ಬುಕಿಂಗ್ 2 ಪರಿಶೀಲಿಸಿ”",
        "tracking": "📍 ಟ್ರಿಪ್ ID ಕಳುಹಿಸಿ. ಉದಾಹರಣೆ: “ಟ್ರಿಪ್ 1 ಟ್ರ್ಯಾಕ್ ಮಾಡಿ”",
        "price": "💰 LoadBack ರೂಟ್, ಸಾಮರ್ಥ್ಯ, ಸಮಯ, ಬೆಲೆ, ವಾಹನ ಮತ್ತು ಟ್ರಸ್ಟ್ ಸ್ಕೋರ್ ಆಧರಿಸಿ ಮ್ಯಾಚ್ ಮಾಡುತ್ತದೆ.",
        "fallback": "ಇನ್ನಷ್ಟು ಮಾಹಿತಿ ಬೇಕಾಗಿದೆ.\n\nಉದಾಹರಣೆ:\n• ಹುಬ್ಬಳ್ಳಿಯಿಂದ ಬೆಂಗಳೂರಿಗೆ ರಿಟರ್ನ್ ಲೋಡ್ ಹುಡುಕಿ\n• 8 ಟನ್ ಟೊಮ್ಯಾಟೊ ಹುಬ್ಬಳ್ಳಿಯಿಂದ ಬೆಂಗಳೂರು\n• ಬುಕಿಂಗ್ 2 ಪರಿಶೀಲಿಸಿ\n• ಟ್ರಿಪ್ 1 ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
        "thanks": "ಸ್ವಾಗತ! 🚛 LoadBack ಜೊತೆಗೆ ಸುರಕ್ಷಿತ ಪ್ರಯಾಣ.",
    },
}

CITY_ALIASES = {
    "hubli": "Hubballi", "huballi": "Hubballi", "hubballi": "Hubballi",
    "हुबली": "Hubballi", "हूबली": "Hubballi", "ಹುಬ್ಬಳ್ಳಿ": "Hubballi",
    "bengaluru": "Bengaluru", "bangalore": "Bengaluru",
    "बेंगलुरु": "Bengaluru", "बैंगलोर": "Bengaluru", "ಬೆಂಗಳೂರು": "Bengaluru",
    "dharwad": "Dharwad", "धारवाड़": "Dharwad", "ಧಾರವಾಡ": "Dharwad",
    "mumbai": "Mumbai", "मुंबई": "Mumbai", "ಮುಂಬೈ": "Mumbai",
    "pune": "Pune", "पुणे": "Pune", "ಪುಣೆ": "Pune",
}

def detect_language(text: str) -> str:
    if re.search(r"[\u0C80-\u0CFF]", text): return "kn"
    if re.search(r"[\u0900-\u097F]", text): return "hi"
    t = text.lower()
    if any(x in t for x in ["namaste","chahiye","dhundo","batao","wapas load","kiraya"]): return "hi"
    if any(x in t for x in ["namaskara","beku","huduki","maadi","hege","eshtu"]): return "kn"
    return "en"

def normalize_language(language: Optional[str], message: str) -> str:
    if language:
        aliases = {"english":"en","en":"en","hindi":"hi","hi":"hi","हिंदी":"hi",
                   "kannada":"kn","kn":"kn","ಕನ್ನಡ":"kn"}
        if language.lower().strip() in aliases:
            return aliases[language.lower().strip()]
    return detect_language(message)

def extract_route(text: str):
    lower = text.lower()
    found = []
    for alias, city in sorted(CITY_ALIASES.items(), key=lambda x: -len(x[0])):
        pos = lower.find(alias)
        if pos >= 0: found.append((pos, city))
    found.sort()
    unique = []
    for pos, city in found:
        if not unique or unique[-1][1] != city: unique.append((pos, city))
    return (unique[0][1], unique[1][1]) if len(unique) >= 2 else None

def extract_id(text: str):
    m = re.search(r"(?:booking|book|trip|बुकिंग|ट्रिप|ಬುಕಿಂಗ್|ಟ್ರಿಪ್)?\s*#?\s*(\d+)\b", text.lower())
    return int(m.group(1)) if m else None

def extract_weight(text: str):
    m = re.search(r"(\d+(?:\.\d+)?)\s*(?:ton|tons|टन|ಟನ್)", text.lower())
    return float(m.group(1)) if m else None

def extract_cargo(text: str):
    cargoes = ["tomatoes","tomato","onion","onions","potato","potatoes","rice","wheat",
               "टमाटर","प्याज","आलू","चावल","गेहूं","ಟೊಮ್ಯಾಟೊ","ಈರುಳ್ಳಿ","ಆಲೂಗಡ್ಡೆ","ಅಕ್ಕಿ"]
    t = text.lower()
    return next((c for c in cargoes if c.lower() in t), None)

class LoadBackChatbot:
    def detect_intent(self, t: str):
        if any(x in t for x in ["hello","hi","hey","namaste","नमस्ते","ನಮಸ್ಕಾರ"]): return "welcome"
        if any(x in t for x in ["help","मदद","सहायता","ಸಹಾಯ"]): return "help"
        if any(x in t for x in ["return load","empty load","back load","find load","रिटर्न लोड","वापसी लोड","लोड खोज","ರಿಟರ್ನ್ ಲೋಡ್","ಲೋಡ್ ಹುಡುಕಿ"]): return "return_load"
        if any(x in t for x in ["create load","post load","need truck","send cargo","लोड बन","लोड रिक्वेस्ट","ಲೋಡ್ ಮಾಡಿ","ಲೋಡ್ ರಿಕ್ವೆಸ್ಟ್"]): return "create_load"
        if any(x in t for x in ["booking","बुकिंग","ಬುಕಿಂಗ್"]): return "booking"
        if any(x in t for x in ["track","tracking","trip","ट्रैक","ट्रिप","ಟ್ರ್ಯಾಕ್","ಟ್ರಿಪ್"]): return "tracking"
        if any(x in t for x in ["price","fare","rate","cost","किराया","कीमत","रेट","ಬೆಲೆ","ದರ"]): return "price"
        if any(x in t for x in ["thanks","thank you","धन्यवाद","शुक्रिया","ಧನ್ಯವಾದ"]): return "thanks"
        return "unknown"

    def handle(self, message: str, language=None, user_id=None):
        lang = normalize_language(language, message)
        t = message.lower().strip()
        intent = self.detect_intent(t)
        action = None

        if intent in ("welcome","help","price","thanks"):
            reply = TEXT[lang][intent]
        elif intent == "return_load":
            route = extract_route(message)
            if route:
                reply = self.route_reply(lang, *route)
                action = "SEARCH_RETURN_LOADS"
            else:
                reply = TEXT[lang]["return_load"]; action = "ASK_ROUTE"
        elif intent == "create_load":
            route, weight, cargo = extract_route(message), extract_weight(message), extract_cargo(message)
            if route and weight and cargo:
                reply = self.load_draft(lang, cargo, weight, *route); action = "CREATE_LOAD_DRAFT"
            else:
                reply = TEXT[lang]["create_load"]; action = "COLLECT_LOAD_DETAILS"
        elif intent == "booking":
            bid = extract_id(message)
            reply = (f"📋 Booking #{bid} received. I’ll fetch its latest status.\n\nAction: GET_BOOKING" if lang=="en"
                     else f"📋 बुकिंग #{bid} मिल गई। मैं लेटेस्ट स्टेटस लाऊँगा।\n\nAction: GET_BOOKING" if lang=="hi"
                     else f"📋 ಬುಕಿಂಗ್ #{bid} ಸಿಕ್ಕಿದೆ. ಇತ್ತೀಚಿನ ಸ್ಟೇಟಸ್ ಪಡೆಯುತ್ತೇನೆ.\n\nAction: GET_BOOKING") if bid else TEXT[lang]["booking"]
            action = "GET_BOOKING" if bid else "ASK_BOOKING_ID"
        elif intent == "tracking":
            tid = extract_id(message)
            reply = (f"📍 Trip #{tid} received. I’ll fetch the latest location and ETA.\n\nAction: GET_TRIP" if lang=="en"
                     else f"📍 ಟ್ರಿಪ್ #{tid} ಸಿಕ್ಕಿದೆ. ಲೆಟೆಸ್ಟ್ ಲೊಕೇಶನ್ ಮತ್ತು ETA ಪಡೆಯುತ್ತೇನೆ.\n\nAction: GET_TRIP" if lang=="kn"
                     else f"📍 ट्रिप #{tid} मिल गई। लेटेस्ट लोकेशन और ETA लाऊँगा।\n\nAction: GET_TRIP") if tid else TEXT[lang]["tracking"]
            action = "GET_TRIP" if tid else "ASK_TRIP_ID"
        else:
            route = extract_route(message)
            if route and any(x in t for x in ["load","लोड","ಲೋಡ್"]):
                reply = self.route_reply(lang, *route); action = "SEARCH_RETURN_LOADS"; intent = "return_load"
            else:
                reply = TEXT[lang]["fallback"]

        return {"reply": reply, "language": lang, "intent": intent, "action": action}

    def route_reply(self, lang, origin, destination):
        if lang=="en":
            return f"🚛 Route detected: {origin} → {destination}.\n\nI’ll search suitable return-load opportunities and rank them by route, capacity, timing, price, vehicle and trust.\n\nAction: SEARCH_RETURN_LOADS"
        if lang=="hi":
            return f"🚛 रूट मिला: {origin} → {destination}.\n\nमैं रिटर्न लोड खोजकर रूट, क्षमता, समय, कीमत, वाहन और ट्रस्ट के आधार पर रैंक करूँगा।\n\nAction: SEARCH_RETURN_LOADS"
        return f"🚛 ರೂಟ್ ಕಂಡುಬಂದಿದೆ: {origin} → {destination}.\n\nರಿಟರ್ನ್ ಲೋಡ್‌ಗಳನ್ನು ರೂಟ್, ಸಾಮರ್ಥ್ಯ, ಸಮಯ, ಬೆಲೆ, ವಾಹನ ಮತ್ತು ಟ್ರಸ್ಟ್ ಆಧರಿಸಿ ರ್ಯಾಂಕ್ ಮಾಡುತ್ತೇನೆ.\n\nAction: SEARCH_RETURN_LOADS"

    def load_draft(self, lang, cargo, weight, origin, destination):
        if lang=="en":
            return f"📦 Load draft created:\nCargo: {cargo}\nWeight: {weight:g} tons\nRoute: {origin} → {destination}\n\nNext: add pickup date/time and offered price.\n\nAction: CREATE_LOAD_DRAFT"
        if lang=="hi":
            return f"📦 लोड ड्राफ्ट तैयार है:\nसामान: {cargo}\nवजन: {weight:g} टन\nरूट: {origin} → {destination}\n\nअगला कदम: पिकअप तारीख/समय और कीमत जोड़ें।\n\nAction: CREATE_LOAD_DRAFT"
        return f"📦 ಲೋಡ್ ಡ್ರಾಫ್ಟ್ ಸಿದ್ಧವಾಗಿದೆ:\nಸರಕು: {cargo}\nತೂಕ: {weight:g} ಟನ್\nರೂಟ್: {origin} → {destination}\n\nಮುಂದೆ: ಪಿಕಪ್ ದಿನಾಂಕ/ಸಮಯ ಮತ್ತು ಬೆಲೆ ಸೇರಿಸಿ.\n\nAction: CREATE_LOAD_DRAFT"

chatbot = LoadBackChatbot()
