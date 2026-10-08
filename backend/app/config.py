# backend/app/config.py

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application configuration for LoadBack.

    Values are loaded from:
    1. Environment variables
    2. .env file
    3. Defaults defined below
    """

    # ============================================================
    # APPLICATION
    # ============================================================

    APP_NAME: str = "LoadBack API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # ============================================================
    # DATABASE
    # ============================================================

    # PostgreSQL
    #
    # Example:
    # postgresql+psycopg2://postgres:password@localhost:5432/loadback
    #
    # Put your actual value in .env
    DATABASE_URL: str = (
        "postgresql+psycopg2://postgres:postgres@localhost:5432/loadback"
    )

    # ============================================================
    # SECURITY / JWT
    # ============================================================

    SECRET_KEY: str = "change-this-secret-key-in-production"

    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # ============================================================
    # CORS
    # ============================================================

    CORS_ORIGINS: str = (
        "http://localhost:5173,"
        "http://127.0.0.1:5173,"
        "http://localhost:3000,"
        "http://127.0.0.1:3000"
    )

    # ============================================================
    # RAZORPAY
    # ============================================================

    RAZORPAY_KEY_ID: str = ""
    RAZORPAY_KEY_SECRET: str = ""

    # ============================================================
    # WHATSAPP
    # ============================================================

    WHATSAPP_ACCESS_TOKEN: str = ""
    WHATSAPP_PHONE_NUMBER_ID: str = ""
    WHATSAPP_VERIFY_TOKEN: str = ""

    # ============================================================
    # MAP / ROUTING
    # ============================================================

    MAPBOX_ACCESS_TOKEN: str = ""

    # ============================================================
    # AI / ML
    # ============================================================

    OPENAI_API_KEY: str = ""
    GOOGLE_API_KEY: str = ""

    # ============================================================
    # REDIS
    # ============================================================

    REDIS_URL: str = "redis://localhost:6379/0"

    # ============================================================
    # PYDANTIC SETTINGS CONFIGURATION
    # ============================================================

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )


# ================================================================
# SETTINGS FACTORY
# ================================================================

@lru_cache
def get_settings() -> Settings:
    """
    Return a cached Settings instance.

    Using lru_cache prevents the .env file from being
    re-read every time settings are requested.
    """
    return Settings()


# ================================================================
# GLOBAL SETTINGS INSTANCE
# ================================================================

settings = get_settings()