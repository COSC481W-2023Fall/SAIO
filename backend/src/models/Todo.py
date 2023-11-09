from pydantic import BaseModel
from bson.objectid import ObjectId

class Todo(BaseModel):
    id: str
    email:str
    text: str
