from typing import Annotated
from fastapi import APIRouter, Header, HTTPException
from ...models.notes import ( GetNoteRequest, GetNoteResponse )
from ...dbfuncs.notes import ( get_note )

router = APIRouter(
    prefix='/app/notes',
    tags=['Notes']
)

@router.post("")
async def create_note():
    pass

@router.get("")
async def read_note(
        x_email: Annotated[str | None, Header()] = None,
        x_note_id: Annotated[str | None, Header()] = None
    ) -> GetNoteResponse:

    print("X-EMAIL:" + x_email)
    result = await get_note(x_email, x_note_id)

    if result == None or result.get('_id') == None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    print(result)
    print(result.get('adjacent_note_ids'))

    return GetNoteResponse(
        title = result.get('title'),
        adjacent = map(lambda x: str(x), result.get('adjacent_note_ids')),
        text = result.get('text')
    )

@router.patch("")
async def update_note():
    pass

@router.delete("")
async def delete_note():
    pass