from dotenv import load_dotenv
from pymongo.errors import DuplicateKeyError
from starlette.responses import JSONResponse
import os

# Get Secret Items
load_dotenv()
connection_string = os.getenv("ConnectionString")

# MongoDB Driver
import motor.motor_asyncio
client = motor.motor_asyncio.AsyncIOMotorClient(connection_string)

# Create Database & Collection
database = client.SAIO
collection = database.users

async def insert_user(user_dict):
    try:
        print(user_dict)
        user = await collection.insert_one(user_dict)
        return {"user_id": str(user.inserted_id), "message": "User registered successfully"}
    except DuplicateKeyError:
        return JSONResponse(content={"message": "Email is already in use"}, status_code=409)

# Get email 
async def check_email(email: str):
    email_exists = await collection.find_one({"email": email})
    return {"email_exists": email_exists is not None}

# Get password 
async def check_password(password: str):
    password_exists = await collection.find_one({"password": password})
    return {"password_exists": password_exists is not None}