from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import date  

class User(BaseModel):
    user_id: str = Field(..., description="Google User ID")
    email: EmailStr = Field(..., description="User's email address")
    name: Optional[str] = Field(None, description="User's full name")
    picture: Optional[str] = Field(None, description="URL to the user's profile picture")
    locale: Optional[str] = Field(None, description="User's locale")
    token: Optional[str] = Field(None, description="Google OAuth token")
    jwt_token: Optional[str] = Field(None, description="JWT token for authenticated sessions")
    first_name: Optional[str] = Field(None, description="User's first name")
    last_name: Optional[str] = Field(None, description="User's last name")
    dob: Optional[date] = Field(None, description="User's date of birth") 
    state: Optional[str] = Field(None, description="User's state") 
    city: Optional[str] = Field(None, description="User's city")  