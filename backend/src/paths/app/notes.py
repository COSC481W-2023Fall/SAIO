from typing import Annotated, Union
from fastapi import APIRouter, Header, HTTPException, Response
from fastapi.responses import JSONResponse
from ...models.common import ( MessageResponse )
from ...models.notes import *
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

@router.get("/{note_id:str}",
    responses = {200: {"model": GetNoteResponse}, 404: {"model": MessageResponse}},
    response_model = GetNoteResponse)
async def get_note(
        x_email: Annotated[str | None, Header()],
        note_id: str):

    note: dict = await funcs.get_note(x_email, note_id)

    if note == None or note.get('_id') == None:
        return MessageResponse(status_code=404, message="Not found")
    
    print(note)
    title: str = note.get('title')
    adjacent: list[str] = map(lambda x: str(x), note.get('adjacent_note_ids'))
    text: str = "" if note.get('text') == None else note.get('text')
    
    return JSONResponse(
        status_code = 200,
        content = {
            "title": title,
            "adjacent": adjacent,
            "text": text
        }
    )

@router.patch("/{note_id:str}",
    responses = {200: {"model": MessageResponse}, 400: {"model": MessageResponse}, 404: {"model": MessageResponse}, 422: {"model": MessageResponse}},
    response_model = MessageResponse)
async def update_note(
        request: UpdateNoteRequest,
        x_email: Annotated[str | None, Header()],
        note_id: str):
    result = await funcs.update_note(x_email, note_id, request.title, request.adjacent, request.text)

    print(note_id)
    print(request)
    
    if result == -1:
        return JSONResponse(status_code=400, content={"message":"Invalid Note Id"})
    elif result == 0:
        return JSONResponse(status_code=400, content={"message":"No data changed"})
    
    return JSONResponse(status_code=200, content={"message":"OK"})

@router.delete("/{note_id:str}",
    responses = {200: {"model": MessageResponse}, 400: {"model": MessageResponse}, 404: {"model": MessageResponse}, 422: {"model": MessageResponse}},
    response_model = MessageResponse)
async def delete_note(
        x_email: Annotated[str | None, Header()],
        note_id: str):
    
    result = await funcs.delete_note(x_email, note_id)

    if result is None:
        return JSONResponse(status_code=422, content={"message":"Cannot delete root note"})
    elif result == 0:
        return JSONResponse(status_code=404, content={"message":"Note not found"})
    elif result == -1:
        return JSONResponse(status_code=400, content={"message":"Invalid Note Id"})
    
    return MessageResponse(status_code=200, message="OK")