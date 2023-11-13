from pydantic import BaseModel
from bson.objectid import ObjectId

class updateTodo(BaseModel):
    text: str
    isComplete:bool
