from pydantic import BaseModel

# Model for password data
class Password(BaseModel):
    password: str