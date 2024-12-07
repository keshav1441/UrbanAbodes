from fastapi import APIRouter, HTTPException
from models.user import User, AuthRequest
from configs.db import user_coll
from jose import JWTError, jwt
import httpx
from fastapi.responses import JSONResponse
from typing import Dict
import os
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

router = APIRouter()

# Constants
SECRET_KEY = os.getenv("SECRET_KEY", "your_default_secret_key")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))  # Default to 30 minutes if not set
ALGORITHM = os.getenv("ALGORITHM", "HS256")

# OAuth2 Password bearer token scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/google")

def create_access_token(data: User, expires_delta: Optional[timedelta] = None):
    try:
        to_encode = data.dict()
        expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    except JWTError as e:
        raise HTTPException(status_code=500, detail="Token creation failed")


async def authenticate_user(token_id: str):
    try:
        # Validate Google Token
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://oauth2.googleapis.com/tokeninfo",
                params={"id_token": token_id}
            )
        
        # Log response for debugging
        print(f"Google Token Validation Response: {response.status_code} - {response.text}")

        if response.status_code != 200:
            raise HTTPException(status_code=401, detail=f"Invalid token: {response.text}")

        user_info = response.json()
        user_id = user_info.get("sub")
        email = user_info.get("email")
        name = user_info.get("name")
        picture = user_info.get("picture")
        locale = user_info.get("locale")

        if not user_id:
            raise HTTPException(status_code=401, detail="User ID not found in token")

        # Check if user exists
        user = await user_coll.find_one({"user_id": user_id})
        if user:
            # Update existing user with new data
            await user_coll.update_one(
                {"user_id": user_id},
                {"$set": {"token": token_id, "email": email, "name": name, "picture": picture, "locale": locale}}
            )
        else:
            # Insert new user
            new_user = User(
                user_id=user_id,
                email=email,
                name=name,
                picture=picture,
                locale=locale,
                token=token_id
            )
            await user_coll.insert_one(new_user.dict())

        # Generate access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data=User(user_id=user_id, email=email, name=name),
            expires_delta=access_token_expires
        )

        return {
            "success": True,
            "access_token": access_token,
            "token_type": "bearer",
            "message": "User authenticated successfully",
            "redirect_url": f"/dashboard/{user_id}" if user else f"/form2/{user_id}"
        }

    except httpx.RequestError as req_error:
        raise HTTPException(status_code=500, detail=f"Request error: {str(req_error)}")
    except Exception as e:
        # Log the full exception for better debugging
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.post("/auth/google")
async def authenticate_google_user(auth_request: AuthRequest):
    return await authenticate_user(auth_request.tokenId)
