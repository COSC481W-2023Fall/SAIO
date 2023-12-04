from pydantic import BaseModel

# Create user model
class UserEdit(BaseModel):
    
    email: str
    newName: str
    newEmail: str
    newPass: str 