from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.configs import settings
from routers.routes import api_routers

app = FastAPI()

app.include_router(api_routers, prefix="/api")

origins = settings.CLIENT_URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if _name_ == "_main_":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")