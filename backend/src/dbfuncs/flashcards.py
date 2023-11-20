from dotenv import load_dotenv
import os
from src.models.Flashcard import Flashcard
from bson import ObjectId
from fastapi.encoders import jsonable_encoder
from src.paths.login import get_current_user
# Get Secret Items
load_dotenv()
connection_string = os.getenv("ConnectionString")

# MongoDB Driver
import motor.motor_asyncio
client = motor.motor_asyncio.AsyncIOMotorClient(connection_string)

# Create Database & Collection
database = client.SAIO
collection = database.flashcard


# Function to create a new flashcard
async def create_flashcard(flashcard: Flashcard):
    # Assign a new unique string as the _id
    flashcard_data = flashcard.dict()
    flashcard_data["user_email"] = await get_current_user(flashcard_data["user_email"])
    flashcard_data['_id'] = str(ObjectId())

    # Insert the flashcard into the collection
    result = await collection.insert_one(flashcard_data)

    # Find the created flashcard using the _id
    created_flashcard = await collection.find_one({"_id": flashcard_data['_id']})

   # Return the created flashcard as a Flashcard instance
    return Flashcard(**created_flashcard)


# Read All Flashcards
async def read_all_flashcards(category: str, user_email: str):
    user_email = await get_current_user(user_email)
    flashcards = await collection.find({"category": category, "user_email": user_email}).to_list(length=None)
    for flashcard in flashcards:
        flashcard['_id'] = str(flashcard['_id'])
    return flashcards

async def delete_flashcard_by_id(flashcard_id: str):
    # Delete the flashcard by its ObjectId
    result = await collection.delete_one({"_id": flashcard_id})
    # Check if a document was deleted
    return result.deleted_count > 0

# Update Flashcard
async def update_flashcard(flashcard_id: str, updated_flashcard: Flashcard):
    updated_flashcard = updated_flashcard.dict()
    updated_flashcard["user_email"] = await get_current_user(updated_flashcard["user_email"])
    result = await collection.update_one(
        {"_id": flashcard_id},
        {"$set": updated_flashcard},
    )
    if result.modified_count == 0:
        raise ValueError(f"Flashcard not found")
    return {"message": "Flashcard updated successfully"}

