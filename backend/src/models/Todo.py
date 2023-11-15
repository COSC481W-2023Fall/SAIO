from pydantic import BaseModel
from bson.objectid import ObjectId

class Todo(BaseModel):
    id: int
    text: str
    email:str
    isComplete:bool
