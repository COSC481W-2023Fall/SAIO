from fastapi import APIRouter
from fastapi import HTTPException
from src.models.Flashcard import Flashcard
from pydantic import BaseModel
from typing import List
from src.dbfuncs.flashcards import (
    create_flashcard,
    read_all_flashcards,
    delete_flashcard,
    update_flashcard
)
router = APIRouter()

# Create Flashcard
@router.post("/flashcards", tags=["flashcards"], response_model=Flashcard)
async def post_flashcard(flashcard: Flashcard):
    response = await create_flashcard(flashcard)
    if response:
        return response
    raise HTTPException(400, "Something went wrong with the create flashcard request")

# Read All Flashcards
@router.get("/flashcards", tags=["flashcards"])
async def get_flashcards(category: str, user_email: str):
    response = await read_all_flashcards(category, user_email)
    return response

# Delete Flashcard
@router.delete("/flashcards/{flashcard_id}", tags=["flashcards"])
async def delete_flashcard_route(flashcard_id: str, user_email: str):
    try:
        response = await delete_flashcard(flashcard_id, user_email)
        return response
    except ValueError as ve:
        raise HTTPException(404, str(ve))
    
# Update Flashcard
@router.put("/flashcards/{flashcard_question}", tags=["flashcards"])
async def put_flashcard(flashcard_question: str, updated_flashcard: Flashcard, user_email: str):
    try:
        response = await update_flashcard(flashcard_question, updated_flashcard, user_email)
        return response
    except ValueError as ve:
        raise HTTPException(404, str(ve))