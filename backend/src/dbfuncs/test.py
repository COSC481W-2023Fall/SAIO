from dotenv import load_dotenv
import os

# Get Secret Items
load_dotenv()
connection_string = os.getenv("ConnectionString")

# MongoDB Driver
import motor.motor_asyncio
client = motor.motor_asyncio.AsyncIOMotorClient(connection_string)

# Create Database & Collection
database = client.SAIO
collection = database.test

# Create a sample test
async def create_test(sample):
    document = sample
    result = await collection.insert_one(document)
    return document

# Read / Fetch 1 User Name
async def read_one_test(name):
    document = await collection.find_one({"name": name})
    return document

# Update a User Test
async def update_test(name, email, password):
    await collection.update_one({"name":name}, {"$set": {"email": email, "password": password}})
    document = await collection.find_one({"name": name})
    return document

# Delete a User Name
async def remove_test(name):
    collection = database.test
    await collection.delete_one({"name":name})
    return True

