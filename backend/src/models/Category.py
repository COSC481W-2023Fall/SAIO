from pydantic import BaseModel

class Category(BaseModel):
    _id: str
    name: str
    user_email: str
