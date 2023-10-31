from fastapi import APIRouter, HTTPException
from src.models.TestModel import sample
from src.dbfuncs.test import (
    create_test,
    read_one_test,
    update_test,
    remove_test
)

router = APIRouter(
    prefix = "/test",
    tags = ["Test"]
)

# Create User
@router.post("/", response_model=sample)
async def post_user(user:sample):
    response = await create_test(user.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong, bad request")

# Read 1 test
@router.get("/{name}", response_model=sample)
async def get_user_by_name(name):
    response = await read_one_test(name)
    if response:
        return response
    raise HTTPException(404, f"There is no test with this name: {name}")

# Update test
@router.put("/{name}", response_model=sample)
async def put_user(name:str, email: str, password:str):
    response = await update_test(name, email, password)
    if response:
        return response
    raise HTTPException(404, f"There is no Todo item with this title {id}")

# Delete test
@router.delete("/{name}")
async def delete_user(name):
    response = await remove_test(name)
    if response:
        return "Successfully deleted User"
    raise HTTPException(404, f"There is no Todo item with this title {name}")