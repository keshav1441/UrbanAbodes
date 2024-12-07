from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import date  

class AuthRequest(BaseModel):
    tokenId: str = Field(..., description="Google OAuth token ID")

class TokenPayload(BaseModel):
    userId: str = Field(..., description="User ID from the token")
    email: EmailStr = Field(..., description="User's email address")
    first_name: Optional[str] = Field(None, description="User's first name")
    last_name: Optional[str] = Field(None, description="User's last name")
    dob: Optional[date] = Field(None, description="User's date of birth") 
    state: Optional[str] = Field(None, description="User's state") 
    city: Optional[str] = Field(None, description="User's city")  
    
class Form2(BaseModel):
    first_name: str = Field(None, description="User's first name")
    last_name: str = Field(None, description="User's last name")
    dob: date = Field(None, description="User's date of birth") 
    state: str = Field(None, description="User's state") 
    city: str = Field(None, description="User's city")
