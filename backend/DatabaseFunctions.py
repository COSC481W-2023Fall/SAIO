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

