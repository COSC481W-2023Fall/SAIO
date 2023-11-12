from dotenv import load_dotenv
import os
from pydantic import BaseModel
from src.models.Flashcard import Flashcard
from bson import ObjectId
from typing import List

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
    document = flashcard.dict()
    result = await collection.insert_one(document)
    created_flashcard = await collection.find_one({"_id": result.inserted_id})
    return Flashcard(**created_flashcard)

# Read All Flashcards
async def read_all_flashcards(category: str, user_email: str):
    flashcards = []
    cursor = collection.find({"category": category, "user_email": user_email})
    async for document in cursor:
        flashcards.append(Flashcard(**document))
    return flashcards

async def read_all_flashcards_questions(category: str, user_email: str):
    questions = []
    cursor = collection.find({"category": category, "user_email": user_email})
    async for document in cursor:
        flashcard = Flashcard(**document)
        questions.append(flashcard.question)
    return questions

# Delete Flashcard
async def delete_flashcard(flashcard_id: str, user_email: str):
    result = await collection.delete_one({"question": flashcard_id, "user_email": user_email})
    if result.deleted_count == 0:
        raise ValueError(f"Flashcard with question {flashcard_id} not found for user {user_email}")
    return {"message": "Flashcard deleted successfully"}

# Update Flashcard
async def update_flashcard(flashcard_question: str, updated_flashcard: Flashcard, user_email: str):
    result = await collection.update_one(
        {"question": flashcard_question, "user_email": user_email},
        {"$set": updated_flashcard.dict()},
    )
    if result.modified_count == 0:
        raise ValueError(f"Flashcard with question {flashcard_question} not found for user {user_email}")
    return {"message": "Flashcard updated successfully"}

