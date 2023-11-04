import os
from dotenv import load_dotenv
from bson.objectid import ObjectId
from pymongo.errors import DuplicateKeyError
import motor.motor_asyncio

load_dotenv()
connection_string = os.getenv("ConnectionString")
client = motor.motor_asyncio.AsyncIOMotorClient(connection_string)
database = client.SAIO
collection = database.notes_test
user_collection = database.users

async def get_note(email: str, _id: str):
    object_id = ObjectId()

    if _id == None:
        print("finding root")
        # if _id is not given, find the user's root note
        # and create a root note if needed
        result = await user_collection.find_one({"email": email})
        object_id = result.get("root_note_id")

        if object_id == None:
            print("creating root since none was found")
            # if there is no root note, create one
            object_id = (await collection.insert_one({
                "email": email,
                "title": "Your Root Note",
                "adjacent_note_ids": [],
                "text": "Welcome to the Notes Applet! You are looking at your root note. A note can contain text and links to other notes. Try it out by clicking around!"
            })).inserted_id
            # link new root id to account
            await user_collection.update_one({"email": email}, { "$set": {"root_note_id": object_id}})
    else:
        object_id = ObjectId(_id)  
    
    return await collection.find_one({"_id": object_id, "email": email})
