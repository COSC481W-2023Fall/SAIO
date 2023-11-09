from ast import Str
from bson.objectid import ObjectId
from urllib import response
from ..models.Todo import Todo
from fastapi import APIRouter, HTTPException
from ..dbfuncs import todo as funcs


router = APIRouter(
     prefix = "/todo")


@router.get("")
async def get_todos():
    response = await funcs.fetch_all_todos()
    print(response)
    if response:
        return response
    raise HTTPException(400, "Something went wrong, bad request")

@router.post("",response_model=Todo)
async def put_todos(todo:Todo):
    response = await funcs.create_todo(todo.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong, bad request")

@router.put("/{id}", response_model=Todo)
async def put_todo(id :str ,text:str):
    response = await funcs.update_todo(id,text)
    if response:
        return response
    raise HTTPException(404, "There is no todo with the id "+id)

@router.delete("/{id}")
async def delete_todo(id:str):
    response = await funcs.remove_todo(id)
    if response:
        return "Successfully deleted todo"
    raise HTTPException(404, "There is no todo with the id"+id)

