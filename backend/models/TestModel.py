from bson import ObjectId
from pydantic import BaseModel

class sample(BaseModel):
    _id: ObjectId
    name: str
    email: str
    password: str
    