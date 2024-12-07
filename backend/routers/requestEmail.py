from fastapi import APIRouter, HTTPException
from models.requestemail import RequestEmail
from configs.db import request_email_coll

router = APIRouter()

async def CreateRequestEmail(request_email: RequestEmail):
    try:
        email_dict = request_email.dict()

        result = request_email_coll.insert_one(email_dict)

        if result.inserted_id:
            print(f"Inserted email with ID: {result.inserted_id}")
        else:
            raise HTTPException(status_code=500, detail="Email insertion failed")
    except Exception as e:
        print(f"Error occurred: {str(e)}") 
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

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
        print(f"Unexpected error: {str(e)}")  
        raise HTTPException(status_code=500, detail="Internal Server Error")
