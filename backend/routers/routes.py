# cspell:disable
from fastapi import APIRouter
from routers.requestEmail import router as request_email_router



api_routers = APIRouter()



api_routers.include_router(request_email_router, tags=["Request Email"])
