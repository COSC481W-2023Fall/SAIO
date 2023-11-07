from pydantic import BaseModel, Field

class GetNoteRequest(BaseModel):
    email: str
    _id: str

class UpdateNoteRequest(BaseModel):
    title: str | None = Field(
        default=None, title="The updated title.")
    adjacent: list[str] | None = Field(
        default=None, title="The updated adjancent note IDs.", max_length=300)
    text: str | None = Field(
        default=None, title="The updated text.")

class Item(BaseModel):
    name: str
    description: str | None = Field(
        default=None, title="The description of the item", max_length=300
    )
    price: float = Field(gt=0, description="The price must be greater than zero")
    tax: float | None = None

class CreateNoteResponse(BaseModel):
    note_id: str

class GetNoteResponse(BaseModel):
    title: str
    adjacent: list[str]
    text: str