# cspell:disable

from fastapi import FastAPI
import os
from fastapi.middleware.cors import CORSMiddleware
from routers.routes import api_routers

from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.include_router(api_routers, prefix="/api")

origins = os.getenv("CLIENT_URL")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
