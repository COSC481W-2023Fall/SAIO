from fastapi import APIRouter
from pydantic import BaseModel
from passlib.context import CryptContext
from fastapi import HTTPException
from src.models import UserEdit
from src.paths.login import get_current_user
from src.paths.signup import hash_password
from src.dbfuncs.edit import (
    edit_email,
    edit_password,
    edit_name,
    user_name,
    remove_user
)

router = APIRouter(
    prefix = "/edit",
    tags = ["Edit"]
)

@router.put("/")
async def edit(user:UserEdit.UserEdit):
    user = user.dict()
    user['email'] = await get_current_user(user['email'])
    if user["newEmail"] != '':
        response = await edit_email(user['email'], user['newEmail'])


    if user['newPass'] != '':
        password = hash_password( user['newPass'])
        response = await edit_password(user['email'], password)

    if user['newName'] != '':
       response = await edit_name(user['email'],user['newName'])

    return {"userModified": response}

@router.get("/{token}")
async def get_name(token):
    email = await get_current_user(token)

    response = await user_name(email)

    return response["name"]

@router.delete("/{token}")
async def delete_user(token):

    email = await get_current_user(token)

    return await remove_user(email)