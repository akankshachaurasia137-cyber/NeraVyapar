from functools import lru_cache
from pydantic_settings import BaseSettings , settingsConfigDict

class settings(BaseSettings):
    app_name: str="Nera_Vyapar API"
    enviornment: str="devlopment"
    debug: bool=True
    database_url:str="postgresql+psycopg://postgres:postgres@localhost:5432/loadback"
    secret_key:str="change-this-secret-key"
    access_token_expire_minutes: int = 60 * 24
    cors_origins: str = "*"
    razorpay_key_id: str = ""
    razorpay_key_secret: str = ""
    whatsapp_verify_token: str = "loadback-verify"
    whatsapp_access_token: str = ""
    whatsapp_phone_number_id: str = ""
    mapbox_token: str = ""
    frontend_url: str = "http://localhost:5173"
    model_dir: str = "ml/models"
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_list(self):
        return [x.strip() for x in self.cors_origins.split(",") if x.strip()]

@lru_cache
def get_settings():
    return Settings()

settings= get_settings()