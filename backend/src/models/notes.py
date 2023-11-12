from pydantic import BaseModel, Field

class GetNoteRequest(BaseModel):
    email: str
    _id: str

class UpdateNoteRequest(BaseModel):
    title: str | None = Field(
        default=None, title="The updated title.")
    adjacent: list[str] | None = Field(
        default=None, title="The updated adjancent note IDs.")
    text: str | None = Field(
        default=None, title="The updated text.")
    raw_draft_content_state: dict | None = Field(
        default=None, title="The raw Draft content state.")

class CreateNoteRequest(BaseModel):
    adjacent: list[str] | None = Field(
        default=None, title="The new note's adjacent note IDs."
    )

class CreateNoteResponse(BaseModel):
    note_id: str

class GetNoteResponse(BaseModel):
    note_id: str
    title: str
    adjacent: list[str]
    text: str
    raw_draft_content_state: dict | None = Field(
        default=None, title="The description of the item", max_length=300
    )