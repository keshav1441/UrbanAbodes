from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

if MONGO_URI:
    conn = MongoClient(MONGO_URI)
    print("MongoDB connected successfully!")
else:
    print("MONGO_URI not found in .env file!")
