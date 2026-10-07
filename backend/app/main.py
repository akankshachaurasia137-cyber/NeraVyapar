

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from app.database import engine, Base


from app.routes import (
    auth,
    users,
    drivers,
    trucks,
    traders,
    loads,
    matching,
    pooling,
    multi_hop,
    pricing,
    prediction,
    route_risk,
    bookings,
    payments,
    tracking,
    notifications,
    whatsapp,
)


Base.metadata.create_all(bind=engine)



# ============================================================

app = FastAPI(
    title="LoadBack API",
    description=(
        "AI-assisted return-trip optimization platform for "
        "drivers, traders and freight operators."
    ),
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# ROOT / HEALTH CHECK
# ============================================================

@app.get("/")
def root():
    return {
        "message": "LoadBack API is running",
        "version": "1.0.0",
        "status": "healthy",
    }


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "loadback-backend",
    }


# ============================================================
# API ROUTES
# ============================================================

API_PREFIX = "/api"


# Authentication
app.include_router(
    auth.router,
    prefix=f"{API_PREFIX}/auth",
    tags=["Authentication"],
)

# Users
app.include_router(
    users.router,
    prefix=f"{API_PREFIX}/users",
    tags=["Users"],
)

# Drivers
app.include_router(
    drivers.router,
    prefix=f"{API_PREFIX}/drivers",
    tags=["Drivers"],
)

# Trucks
app.include_router(
    trucks.router,
    prefix=f"{API_PREFIX}/trucks",
    tags=["Trucks"],
)

# Traders
app.include_router(
    traders.router,
    prefix=f"{API_PREFIX}/traders",
    tags=["Traders"],
)

# Loads
app.include_router(
    loads.router,
    prefix=f"{API_PREFIX}/loads",
    tags=["Loads"],
)

# Matching
app.include_router(
    matching.router,
    prefix=f"{API_PREFIX}/matching",
    tags=["Matching"],
)

# Load Pooling
app.include_router(
    pooling.router,
    prefix=f"{API_PREFIX}/pooling",
    tags=["Load Pooling"],
)

# Multi-hop Routes
app.include_router(
    multi_hop.router,
    prefix=f"{API_PREFIX}/multi-hop",
    tags=["Multi-Hop"],
)

# Fair Pricing
app.include_router(
    pricing.router,
    prefix=f"{API_PREFIX}/pricing",
    tags=["Pricing"],
)

# AI Predictions
app.include_router(
    prediction.router,
    prefix=f"{API_PREFIX}/predictions",
    tags=["AI Predictions"],
)

# Route Risk
app.include_router(
    route_risk.router,
    prefix=f"{API_PREFIX}/route-risk",
    tags=["Route Risk"],
)

# Bookings
app.include_router(
    bookings.router,
    prefix=f"{API_PREFIX}/bookings",
    tags=["Bookings"],
)

# Payments
app.include_router(
    payments.router,
    prefix=f"{API_PREFIX}/payments",
    tags=["Payments"],
)

# Live Tracking
app.include_router(
    tracking.router,
    prefix=f"{API_PREFIX}/tracking",
    tags=["Tracking"],
)

# Notifications
app.include_router(
    notifications.router,
    prefix=f"{API_PREFIX}/notifications",
    tags=["Notifications"],
)

# WhatsApp
app.include_router(
    whatsapp.router,
    prefix=f"{API_PREFIX}/whatsapp",
    tags=["WhatsApp"],
)


# ============================================================
# STARTUP / SHUTDOWN
# ============================================================

@app.on_event("startup")
async def startup_event():
    print("==========================================")
    print("       LOADBACK BACKEND STARTED")
    print("==========================================")
    print("API      : http://127.0.0.1:8000")
    print("Swagger  : http://127.0.0.1:8000/docs")
    print("ReDoc    : http://127.0.0.1:8000/redoc")
    print("==========================================")


@app.on_event("shutdown")
async def shutdown_event():
    print("LoadBack backend shutting down...")