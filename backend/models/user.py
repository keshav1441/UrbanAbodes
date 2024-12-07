from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class User(BaseModel):
    user_id: str
    email: EmailStr
    name: Optional[str] = None
    picture: Optional[str] = None
    locale: Optional[str] = None
    token: Optional[str] = None
    jwt_token: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    dob: Optional[date] = None
    state: Optional[str] = None
    city: Optional[str] = None

class AuthRequest(BaseModel):
    tokenId: str
