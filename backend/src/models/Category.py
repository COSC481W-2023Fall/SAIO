from pydantic import BaseModel

class Category(BaseModel):
    name: str
    user_email: str
