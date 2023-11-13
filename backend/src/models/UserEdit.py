from pydantic import BaseModel

# Create user model
class UserEdit(BaseModel):
    
    email: str
    password: str
    newEmail: str
    newPass: str 