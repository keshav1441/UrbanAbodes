from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime  
from pydantic import field_validator
class AuthRequest(BaseModel):
    tokenId: str = Field(..., description="Google OAuth token ID")
class TokenPayload(BaseModel):
    accessToken: str = Field(..., description="User's access token")
    first_name: Optional[str] = Field(None, description="User's first name")
    last_name: Optional[str] = Field(None, description="User's last name")
    dob: Optional[datetime] = Field(None, description="User's date of birth") 
    state: Optional[str] = Field(None, description="User's state") 
    city: Optional[str] = Field(None, description="User's city") 
    
    @field_validator("dob", mode="before")
    def format_dob(cls, v):
        if v and isinstance(v, datetime):
            return v.strftime("%Y-%m-%d")
        return v 