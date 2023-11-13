from fastapi import APIRouter
from fastapi import HTTPException, Response
from src.models.Flashcard import Flashcard
from bson import ObjectId
from src.dbfuncs.flashcards import (
    create_flashcard,
    read_all_flashcards,
    update_flashcard,
    delete_flashcard_by_id
)
router = APIRouter()

@router.post("/flashcards", tags=["flashcards"], response_model=Flashcard)
async def post_flashcard(flashcard: Flashcard):
    # Insert the flashcard into the collection
    response = await create_flashcard(flashcard)
    
    if response:
        return response
    raise HTTPException(400, "Something went wrong with the create flashcard request")


# Read All Flashcards
@router.get("/flashcards", tags=["flashcards"])
async def get_flashcards(category: str, user_email: str):
    try:
        response = await read_all_flashcards(category, user_email)
        return response
    except Exception as e:
        # Log the exception for debugging
        print(f"Error in get_flashcards: {e}")
        raise


# Delete Flashcard
@router.delete("/flashcards/{flashcard_id}", tags=["flashcards"])
async def delete_flashcard(flashcard_id: str):
    result = await delete_flashcard_by_id(flashcard_id)
    if result:
        return {"message": "Flashcard deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Flashcard not found")

    
# Update Flashcard
@router.put("/flashcards/{flashcard_id}", tags=["flashcards"])
async def put_flashcard(flashcard_id: str, updated_flashcard: Flashcard):
    try:
        response = await update_flashcard(flashcard_id, updated_flashcard)
        return response
    except ValueError as ve:
        raise HTTPException(404, str(ve))