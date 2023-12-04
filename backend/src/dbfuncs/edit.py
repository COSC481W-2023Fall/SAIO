from dotenv import load_dotenv
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

async def edit_email(oldEmail, newEmail):  
    if collection.find_one({"email": newEmail}):
        return JSONResponse(content={"message": "Email is already in use"}, status_code=409)
    response= await collection.update_one({"email":oldEmail}, {"$set": {'email': newEmail}})
    return response.acknowledged

async def edit_password(email, newPass):  
    
    response= await collection.update_one({"email":email}, {"$set": {'password': newPass}})
    return response.acknowledged

async def edit_name(email, newName):  
    
    response= await collection.update_one({"email":email}, {"$set": {'name': newName}})
    return response.acknowledged


async def edit_both(email,newEmail, newPass):  

    response= await collection.update_one({"email":email}, {"$set": {'email': newEmail, 'password': newPass}})
    return response.acknowledged

async def user_name(email):

    response = await collection.find_one({"email": email})
    return response

async def remove_user(email):

    response = await collection.delete_one({"email": email})
    return response 