from ast import Str
from typing import Annotated, Optional
from fastapi import APIRouter, Header, HTTPException, Response
from bson.objectid import ObjectId
from urllib import response
from ..models.Todo import Todo
from ..models.updateTodo import updateTodo
from fastapi import APIRouter, HTTPException
from ..dbfuncs import todo as funcs



router = APIRouter(
     prefix = "/todo")

@router.get("/{id}", response_model=Todo)
async def get_todo_by_title(id:int,x_email: Annotated[str | None, Header()]):
    response = await funcs.fetch_one_todo(id,x_email)
    if response:
        return response
    raise HTTPException(404, f"There is no todo with the title {id}")

@router.get("")
async def get_todos( x_email: Annotated[str | None, Header()]):
    response = await funcs.fetch_all_todos(x_email)
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
async def put_todo(id :int,update:updateTodo):
    response = await funcs.update_todo(id,update)
    if response:
        return response
    raise HTTPException(400, "There is no email with the todo id "+id)

@router.delete("/{id:int}")
async def delete_todo(id:int):
    print(id)
    response = await funcs.remove_todo(id)
    if response:
        return "Successfully deleted todo"
    raise HTTPException(400, "There is no email with the todo id"+id)

