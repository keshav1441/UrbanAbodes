# router.py or wherever your endpoint is defined
from fastapi import APIRouter, HTTPException
from models.user import User
from configs.db import user_coll
from jose import JWTError, jwt
import httpx
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post("/api/auth/google")
async def authenticate_google_user(token: str):
    # Verify the token with Google
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://oauth2.googleapis.com/tokeninfo?id_token={token}"
        )
        
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Invalid token")
        
        user_info = response.json()
                
        # Extract user details from the response
        email = user_info.get("email")
        name = user_info.get("name")
        picture = user_info.get("picture")
        user_id = user_info.get("sub")  # Google user ID
        locale = user_info.get("locale")  # Optional: user locale
        
        # Check if user already exists in the database
        existing_user = await user_coll.find_one({"email": email})
        
        if existing_user:
            # User exists, you may want to update their info if needed
            user_data = existing_user
        else:
            # Create a new user with all the necessary fields
            user_data = User(
                email=email,
                name=name,
                picture=picture,
                user_id=user_id,
                locale=locale,
                token=token  # Store the token if needed
            )
            await user_coll.insert_one(user_data.dict())  # Insert new user into the database
        
        # Create JWT token (you may want to include user ID or other info)
        token_data = {"email": email}
        jwt_token = jwt.encode(token_data, "YOUR_SECRET_KEY", algorithm="HS256")

        return JSONResponse(content={"access_token": jwt_token, "success": True})
