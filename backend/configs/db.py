from pymongo import MongoClient
from configs.config import MONGODB_URI


client = MongoClient(MONGODB_URI)

db = client.UrbanAbodes
request_email_coll = db["RequestEmail"]
user_coll = db["user"]

