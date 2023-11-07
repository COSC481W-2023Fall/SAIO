from typing import Annotated, Optional
from fastapi import APIRouter, Header, HTTPException, Response
from fastapi.responses import JSONResponse
from ...models.common import *
from ...models.notes import *
from ...dbfuncs import notes as funcs

router = APIRouter(
    prefix='/app/notes',
    tags=['Notes']
)

@router.post('',
    responses = {200: {'model': CreateNoteResponse}, 400: {'model': NotFoundResponse}},
    response_model = CreateNoteResponse)
async def create_note(
        x_email: Annotated[str | None, Header()] = None):    
    
    inserted_id: str = await funcs.create_note(x_email);

    if inserted_id == None:
        raise HTTPException(status_code=400, detail='Something went wrong')

    return CreateNoteResponse(note_id = str(inserted_id))

@router.get('/',
    responses = {200: {'model': GetNoteResponse}, 404: {'model': NotFoundResponse}},
    response_model = GetNoteResponse)
async def get_root_note(
        x_email: Annotated[str | None, Header()]):
    return await get_note(x_email, None)

@router.get('/{note_id:str}',
    responses = {200: {'model': GetNoteResponse}, 404: {'model': NotFoundResponse}},
    response_model = GetNoteResponse)
async def get_note(
        x_email: Annotated[str | None, Header()],
        note_id: str = None):

    note: dict = await funcs.get_note(x_email, note_id)

    if note == None or note.get('_id') == None:
        raise HTTPException(status_code=404, detail='Not found')
    
    title: str = note.get('title')
    adjacent: list[str] = map(lambda x: str(x), note.get('adjacent_note_ids'))
    text: str = '' if note.get('text') == None else note.get('text')
    
    return GetNoteResponse(
        title = title,
        adjacent = adjacent,
        text = text
    )

@router.patch('/{note_id:str}',
    responses = {200: {'model': OkResponse}, 400: {'model': BadResponse}, 404: {'model': NotFoundResponse}},
    response_model = MessageResponse)
async def update_note(
        request: UpdateNoteRequest,
        x_email: Annotated[str | None, Header()],
        note_id: str):
    result = await funcs.update_note(x_email, note_id, request.title, request.adjacent, request.text)

    print(result)
    
    if result == None:
        raise HTTPException(status_code=404, detail='Note not found')
    elif result == -1:
        raise HTTPException(status_code=400, detail='Invalid Note Id')
    elif result == 0:
        return JSONResponse(status_code=400, detail='No data changed')
    
    return MessageResponse(message='OK')

@router.delete('/{note_id:str}',
    responses = {400: {'model': BadResponse}, 404: {'model': NotFoundResponse}},
    response_model = OkResponse)
async def delete_note(
        x_email: Annotated[str | None, Header()],
        note_id: str):
    
    result = await funcs.delete_note(x_email, note_id)

    if result is None:
        raise HTTPException(status_code=400, detail='Cannot delete root note')
    elif result == 0:
        raise HTTPException(status_code=404, detail='Note not found')
    elif result == -1:
        raise HTTPException(status_code=400, detail='Invalid Note Id')
    
    return OkResponse