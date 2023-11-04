from typing import Annotated
from fastapi import APIRouter, Header, HTTPException
from ...models.notes import ( CreateNoteResponse, GetNoteResponse )
from ...dbfuncs import notes as funcs

router = APIRouter(
    prefix='/app/notes',
    tags=['Notes']
)

@router.post("")
async def create_note(
        x_email: Annotated[str | None, Header()] = None,
    ) -> CreateNoteResponse:    
    
    inserted_id: str = await funcs.create_note(x_email);

    if inserted_id == None:
        raise

    return CreateNoteResponse(
        note_id = str(inserted_id)
    )

@router.get("")
async def get_note(
        x_email: Annotated[str | None, Header()] = None,
        x_note_id: Annotated[str | None, Header()] = None
    ) -> GetNoteResponse:

    note: dict = await funcs.get_note(x_email, x_note_id)

    if note == None or note.get('_id') == None:
        raise HTTPException(status_code=404, detail="Note not found")
    
    print(note)
    title: str = note.get('title')
    adjacent: list[str] = map(lambda x: str(x), note.get('adjacent_note_ids'))
    text: str = "" if note.get('text') == None else note.get('text')
    
    return GetNoteResponse(
        title = title,
        adjacent = adjacent,
        text = text
    )

@router.patch("")
async def update_note():
    pass

@router.delete("")
async def delete_note():
    pass