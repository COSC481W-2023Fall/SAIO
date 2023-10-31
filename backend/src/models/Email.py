from pydantic import BaseModel

#Model for email data 
class Email(BaseModel):
    email: str