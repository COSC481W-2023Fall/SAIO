from pydantic import BaseModel
from typing import List
from bson import ObjectId

class Flashcard(BaseModel):
    _id: str
    question: str
    answer: str
    options: List[str]
    category: str
    user_email: str
