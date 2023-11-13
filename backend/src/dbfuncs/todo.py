import os
import asyncio
from dotenv import load_dotenv
import motor.motor_asyncio
from ..models.Todo import (Todo)

load_dotenv()
connection_string = os.getenv("ConnectionString")
client = motor.motor_asyncio.AsyncIOMotorClient(connection_string)
database = client.SAIO
collection = database.todo

async def fetch_one_todo(id, email):
    document = await collection.find_one({"id":id,"email":email})
    return document

async def fetch_all_todos(email):
    todos = []
    cursor = collection.find({"email":email})
    print(connection_string)
    async for document in cursor:
        todos.append(Todo(**document))
    return todos

async def create_todo(todo):
    document = todo
    result = await collection.insert_one(document)
    return

async def update_todo(id,update):
    await collection.update_one({"id": id},
                                {"$set": 
                                 {"text":update.text,"isComplete":update.isComplete}}
                                ,upsert=True)
    document = await collection.find_one({"id":id})
    return document

async def remove_todo(id):
    await collection.delete_one({"id":id})
    return True
                                

