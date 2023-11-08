from pydantic import BaseModel

class Todo(BaseModel):
    id: str
    email:str
    text: str
