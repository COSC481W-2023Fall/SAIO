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

async def find_user(email):  
    return await collection.find_one({"email": email})
    
    


