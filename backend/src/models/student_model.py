from pydantic import BaseModel

class Student(BaseModel):
    firstName: str
    lastName: str