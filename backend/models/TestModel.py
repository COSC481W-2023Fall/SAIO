from pydantic import BaseModel

class sample(BaseModel):
    id: int
    name: str
    email: str
    password: str
    