from pydantic import BaseModel

class Todo(BaseModel):
    id: str
    text: str
