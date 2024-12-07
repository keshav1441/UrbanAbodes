from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient("mongodb://localhost:27017/")  

db = client.UrbanAbodes
request_email_coll = db["RequestEmail"]
user_coll = db["User"]