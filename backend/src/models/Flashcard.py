from pydantic import BaseModel
from typing import List

class Flashcard(BaseModel):
    question: str
    answer: str
    options: List[str]
    category: str
    user_email: str