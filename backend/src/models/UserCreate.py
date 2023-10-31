from pydantic import BaseModel

# Create user model
class UserCreate(BaseModel):
    name: str
    email: str
    password: str