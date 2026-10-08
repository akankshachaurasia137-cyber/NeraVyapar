from pydantic import BaseModel, Field
class RegisterRequest(BaseModel):
    name: str = Field(min_length=2,max_length=120)
    phone: str = Field(min_length=10,max_length=20)
    password: str = Field(min_length=6)
    role: str = "driver"
    language: str = "en"
class LoginRequest(BaseModel): phone: str; password: str
class TokenResponse(BaseModel): access_token: str; token_type: str = "bearer"
