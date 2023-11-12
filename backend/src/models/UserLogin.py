from pydantic import BaseModel

#Model for email data 
class UserLogin(BaseModel):
    email: str
    password: str