# cspell:disable
from fastapi import APIRouter
from routers.requestEmail import router as request_email_router
from routers.auth import router as auth_router



api_routers = APIRouter()



api_routers.include_router(request_email_router, tags=["Request Email"])
api_routers.include_router(auth_router, tags=["Auth"])
