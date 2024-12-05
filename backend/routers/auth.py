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

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/google")

SECRET_KEY = os.getenv("SECRET_KEY", "your_default_secret_key")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
ALGORITHM = os.getenv("ALGORITHM")

def create_access_token(data: User, expires_delta: Optional[timedelta] = None):
    try:
        to_encode = data.dict()
        expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    
    except JWTError as e:
        print(f"JWT Error: {e}")
        raise HTTPException(status_code=500, detail="Token creation failed" )


async def authenticate_user(auth_request: AuthRequest):
    try:
        token_id = auth_request.tokenId
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://oauth2.googleapis.com/tokeninfo",
                params={"id_token": token_id}
            )
            if response.status_code != 200:
                raise HTTPException(status_code=401, detail="Invalid token")

            user_info = response.json()

            user_id = user_info.get("sub")
            user_email = user_info.get("email")
            user_name = user_info.get("name")
            user_picture = user_info.get("picture")
            user_locale = user_info.get("locale")

            if not user_id:
                raise HTTPException(status_code=401, detail="User ID not found in token")

            user = await user_coll.find_one({"user_id": user_id})
            if user:
                user_coll.update_one(
                    {"user_id": user_id},
                    {
                        "$set": {
                            "token": token_id,
                            "email": user_email,
                            "name": user_name,
                            "picture": user_picture,
                            "locale": user_locale
                        }
                    }
                )
            else:
                new_user = User(
                    user_id=user_id,
                    email=user_email,
                    name=user_name,
                    picture=user_picture,
                    locale=user_locale,
                    token=token_id
                )
                user_coll.insert_one(new_user.dict())

            access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)                  
            access_token = create_access_token(
                data= User(
                    userId= user_id,
                    email= user_email,
                    name= user_name
                ),
                expires_delta=access_token_expires
            )

            return {
                "success": True,
                "access_token": access_token,
                "token_type": "bearer",
                "message": "User authenticated successfully",
                "redirect_url": f"/dashboard/{user_id}"
            }
    except HTTPException as http_exc:
        raise http_exc
    

@router.post("/auth/google")
async def authenticate_google_user(token: str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://oauth2.googleapis.com/tokeninfo?id_token={token}")

        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Invalid token")

        user_info = response.json()
        
        email = user_info.get("email")
        name = user_info.get("name")
        picture = user_info.get("picture")
        user_id = user_info.get("sub")
        locale = user_info.get("locale")

        existing_user = await user_coll.find_one({"email": email})
        
        if existing_user:
            user_data = existing_user
        else:
            user_data = User(
                email=email,
                name=name,
                picture=picture,
                user_id=user_id,
                locale=locale,
                token=token  
            )
            await user_coll.insert_one(user_data.dict()) 
        
        token_data = {"user_id": user_id, "email": email}  
        jwt_token = jwt.encode(token_data, SECRET_KEY, algorithm="HS256")

        return JSONResponse(content={"access_token": jwt_token, "success": True})

    except httpx.RequestError as req_error:
        raise HTTPException(status_code=500, detail=f"Request error: {str(req_error)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
