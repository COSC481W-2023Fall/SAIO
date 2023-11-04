from pydantic import BaseModel

class GetNoteRequest(BaseModel):
    email: str
    _id: str

class CreateNoteResponse(BaseModel):
    note_id: str

class GetNoteResponse(BaseModel):
    title: str
    adjacent: list[str]
    text: str