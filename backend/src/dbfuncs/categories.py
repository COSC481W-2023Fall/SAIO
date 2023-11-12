from dotenv import load_dotenv
import os
from fastapi import HTTPException
from src.models.Category import Category

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

# Create Category
async def create_category(category: Category):
    # Specify collation for case-insensitive comparison
    collation = {"locale": "en", "strength": 2}

    # Check for existing category with case-insensitive comparison
    existing_category = await collection.find_one(
        {"name": category.name, "user_email": category.user_email},
        collation=collation,
    )
    if existing_category:
        raise HTTPException(400, f"Category {category.name} already exists for the user {category.user_email}")

    document = {"name": category.name, "user_email": category.user_email}
    result = await collection.insert_one(document)

    return document



# Read All Categories (returning only names)
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


# Update Category
async def update_category(category_name: str, updated_category: Category, user_email: str):
    # Specify collation for case-insensitive comparison
    collation = {"locale": "en", "strength": 2}

    existing_category = await collection.find_one(
        {"name": updated_category.name, "user_email": user_email},
        collation=collation,
    )
    
    # Check if the updated category name already exists for the user
    if existing_category and existing_category["name"] != category_name:
        raise HTTPException(400, f"Category {updated_category.name} already exists for the user {user_email}")

    result = await collection.update_one(
        {"name": category_name, "user_email": user_email},
        {"$set": updated_category.dict()},
        collation=collation,  
    )

    if result.modified_count == 0:
        raise ValueError(f"Category {category_name} not found for user {user_email}")

    return {"message": "Category updated successfully"}


