from dotenv import load_dotenv
from pydantic import BaseModel
import os

# Get Secret Items
load_dotenv()
connection_string = os.getenv("ConnectionString")

# MongoDB Driver
import motor.motor_asyncio
client = motor.motor_asyncio.AsyncIOMotorClient(connection_string)

# Create Database & Collection
database = client.SAIO
collection = database.Users

#Model for email data 
class Email(BaseModel):
    email: str

# Model for password data
class Password(BaseModel):
    password: str

# Get email 
async def check_email(email: str):
    email_exists = await collection.find_one({"email": email})
    return {"email_exists": email_exists is not None}

# Get password 
async def check_password(password: str):
    password_exists = await collection.find_one({"password": password})
    return {"password_exists": password_exists is not None}

# Read / Fetch 1 User Name
async def read_one_user(id):
    document = await collection.find_one({"id":id})
    return document
'''
# Read / Fetch All User Names
async def read_all_users():
    users = []
    cursor = collection.find({})
    async for document in cursor:
        users.append(UserName(**document))
    return users
'''
# Update a User Name
async def update_user(id, name):
    await collection.update_one({"id":id}, {"$set": {"name": name}})
    document = await collection.find_one({"id": id})
    return document

# Delete a User Name
async def remove_user(id):
    await collection.delete_one({"id":id})
    return True