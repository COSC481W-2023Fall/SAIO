from fastapi import APIRouter
from fastapi import HTTPException
from src.models.Category import Category
from src.dbfuncs.categories import (
    create_category,
    read_all_categories,
    delete_category,
    update_category
)
router = APIRouter()

# Create Category
@router.post("/categories", tags=["flashcards"], response_model=Category)
async def post_category(category: Category):
    response = await create_category(category)
    if response:
        return response
    raise HTTPException(400, "Something went wrong with create category request")

# Read All Categories
@router.get("/categories", tags=["flashcards"])
async def get_categories(user_email: str):
    response = await read_all_categories(user_email)
    return response

# Delete Category
@router.delete("/categories/{category_name}", tags=["flashcards"])
async def delete_category_route(category_name: str, user_email: str):
    try:
        response = await delete_category(category_name, user_email)
        return response
    except ValueError as ve:
        raise HTTPException(404, str(ve))
    
# Update Category
@router.put("/categories/{category_name}", tags=["flashcards"])
async def put_category(category_name: str, updated_category: Category, user_email: str):
    try:
        response = await update_category(category_name, updated_category, user_email)
        return response
    except ValueError as ve:
        raise HTTPException(404, str(ve))