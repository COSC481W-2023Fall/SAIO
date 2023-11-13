from dotenv import load_dotenv
import os
from fastapi import HTTPException
from src.models.Category import Category
from bson import ObjectId
# Get Secret Items
load_dotenv()
connection_string = os.getenv("ConnectionString")

# MongoDB Driver
import motor.motor_asyncio
client = motor.motor_asyncio.AsyncIOMotorClient(connection_string)

# Create Database & Collection
database = client.SAIO
collection = database.categories
collection2 = database.flashcard

async def create_category(category: Category):
    # Assign a new unique string as the _id
    category_data = category.dict()
    category_data['_id'] = str(ObjectId())

    # Insert the flashcard into the collection
    result = await collection.insert_one(category_data)

    # Find the created flashcard using the _id
    created_category = await collection.find_one({"_id": category_data['_id']})

   # Return the created flashcard as a Flashcard instance
    return Category(**created_category)


async def read_all_categories(user_email: str):
    categories = []
    cursor = collection.find({"user_email": user_email})
    async for document in cursor:
        categories.append(document["name"])  
    return categories

# Delete Category
async def delete_category(category_name: str, user_email: str):
    result = await collection.delete_one({"name": category_name, "user_email": user_email})
    if result.deleted_count == 0:
        raise ValueError(f"Category {category_name} not found for user {user_email}")

    # Delete all flashcards in the deleted category
    await collection2.delete_many({"category": category_name, "user_email": user_email})

    return {"message": "Category and associated flashcards deleted successfully"}


