from typing import Annotated, Optional
from fastapi import APIRouter, Header, HTTPException, Response
from fastapi.responses import JSONResponse
from ...models.common import *
from ...models.notes import *
from ...dbfuncs import notes as funcs
from src.paths.login import get_current_user

router = APIRouter(
    prefix='/app/notes',
    tags=['Notes']
)

@router.post('',
    responses = {200: {'model': CreateNoteResponse}, 400: {'model': NotFoundResponse}})
async def create_note(
        request: CreateNoteRequest,
        x_email
    ) -> CreateNoteResponse:
    x_email = await get_current_user(x_email)
    inserted_id: str = await funcs.create_note(x_email, adjacent=request.adjacent);

    if inserted_id == None:
        raise HTTPException(status_code=400, detail='Something went wrong')

    return CreateNoteResponse(note_id = str(inserted_id))

@router.get('/',
    responses = {200: {'model': GetNoteResponse}, 404: {'model': NotFoundResponse}},
    response_model = GetNoteResponse)
async def get_root_note(x_email):
    x_email = await get_current_user(x_email)
    note: dict = await funcs.get_note(x_email, None)

    if note == None or note.get('_id') == None:
        raise HTTPException(status_code=404, detail='Not found')
    
    note_id: str = str(note.get('_id'))
    title: str = note.get('title')
    adjacent: list[str] = map(lambda x: str(x), note.get('adjacent_note_ids'))
    text: str = '' if note.get('text') == None else note.get('text')
    raw_draft_content_state = note.get('raw_draft_content_state')
    
    res = GetNoteResponse(
        note_id = note_id,
        title = title,
        adjacent = adjacent,
        text = text,
        raw_draft_content_state = raw_draft_content_state
    )

    return res

@router.get('/{note_id:str}',
    responses = {200: {'model': GetNoteResponse}, 404: {'model': NotFoundResponse}},
    response_model = GetNoteResponse)
async def get_note(
        x_email,
        note_id: str = None):
    x_email = await get_current_user(x_email)   
    note: dict = await funcs.get_note(x_email, note_id)

    if note == None or note.get('_id') == None:
        raise HTTPException(status_code=404, detail='Not found')
    
    note_id: str = str(note.get('_id'))
    title: str = note.get('title')
    adjacent: list[str] = map(lambda x: str(x), note.get('adjacent_note_ids'))
    text: str = '' if note.get('text') == None else note.get('text')
    raw_draft_content_state = note.get('raw_draft_content_state')
    
    res = GetNoteResponse(
        note_id = note_id,
        title = title,
        adjacent = adjacent,
        text = text,
        raw_draft_content_state = raw_draft_content_state
    )

    return res

@router.patch('/{note_id:str}',
    responses = {200: {'model': OkResponse}, 400: {'model': BadResponse}, 404: {'model': NotFoundResponse}},
    response_model = MessageResponse)
async def update_note(
        request: UpdateNoteRequest,
        x_email,
        note_id: str):
    x_email = await get_current_user(x_email)
    result = await funcs.update_note(x_email, note_id, request.title, request.adjacent, request.text, request.raw_draft_content_state)
    
    if result == None:
        raise HTTPException(status_code=404, detail='Note not found')
    elif result == -1:
        raise HTTPException(status_code=400, detail='Invalid Note Id')
    elif result == 0:
        raise HTTPException(status_code=400, detail='No data changed')
    
    return MessageResponse(message='OK')

@router.delete('/{note_id:str}',
    responses = {400: {'model': BadResponse}, 404: {'model': NotFoundResponse}},
    response_model = OkResponse)
async def delete_note(
        x_email,
        note_id: str):
    x_email = await get_current_user(x_email)
    result = await funcs.delete_note(x_email, note_id)

    if result is None:
        raise HTTPException(status_code=400, detail='Cannot delete root note')
    elif result == 0:
        raise HTTPException(status_code=404, detail='Note not found')
    elif result == -1:
        raise HTTPException(status_code=400, detail='Invalid Note Id')
    
    return OkResponse