# cspell:disable
import motor.motor_asyncio
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get the MongoDB URI from environment variable
MONGO_URI = os.getenv("MONGO_URI")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)

db = client.UrbanAbodes
request_email_coll = db["RequestEmail"]
