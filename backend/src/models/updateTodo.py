from pydantic import BaseModel
from bson.objectid import ObjectId

class updateTodo(BaseModel):
    text: str
    date: str
    isComplete:bool
