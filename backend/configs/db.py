from pymongo import MongoClient
# from configs.config import MONGODB_URI


client = MongoClient("mongodb://localhost:27017/")

db = client.UrbanAbodes
request_email_coll = db["RequestEmail"]
user_coll = db["user"]

