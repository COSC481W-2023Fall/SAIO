from pydantic import BaseModel
from bson.objectid import ObjectId

class Todo(BaseModel):
    id: str
    text: str
    email:str
    isCompleted:bool
