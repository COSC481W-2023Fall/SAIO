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

ROOT_NOTE_DEFAULT_TEXT = "Welcome to the Notes Applet! You are looking at your root note. A note can contain text and links to other notes. Try it out by clicking around!"

async def create_note(
        email: str,
        title: str = "Untitled",
        adjacent: list[str] = [],
        text: str = ""
    ) -> str:
    return str((await collection.insert_one({
        "email": email,
        "title": title,
        "adjacent_note_ids": adjacent,
        "text": text
    })).inserted_id)

async def get_note(email: str, note_id: str):
    object_id = ObjectId()

    if note_id == None:
        print("finding root")
        # if _id is not given, find the user's root note
        # and create a root note if needed
        result = await user_collection.find_one({"email": email})
        object_id = result.get("root_note_id")

        if object_id == None:
            # if there is no root note, create one
            print("creating root since none was found")
            
            inserted_id: str = await create_note(email, title="Your Root Note", text=ROOT_NOTE_DEFAULT_TEXT)

            # link new root id to account
            await user_collection.update_one({"email": email}, { "$set": {"root_note_id": ObjectId(inserted_id)}})

            object_id = ObjectId(inserted_id)
    else:
        object_id = ObjectId(note_id)  
    
    return await collection.find_one({"_id": object_id, "email": email})
