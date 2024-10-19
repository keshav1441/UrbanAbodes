from fastapi import APIRouter, HTTPException
from models.requestemail import RequestEmail
from config.db import request_email_coll


router = APIRouter()

async def CreateRequestEmail(request_email: RequestEmail):
    try:
        email_dict = request_email.dict()
        result = await request_email_coll.insert_one(email_dict)
        print("result: ", result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/request-email")
async def create_request_email(request_email: RequestEmail):
    try:
        await CreateRequestEmail(request_email)
        return {
            "success": True,
            "message": "Email request created successfully"
        }
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")