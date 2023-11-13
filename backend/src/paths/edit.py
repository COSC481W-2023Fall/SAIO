from fastapi import APIRouter
from pydantic import BaseModel
from passlib.context import CryptContext
from fastapi import HTTPException
from src.models import UserEdit
from src.paths.signup import hash_password
from src.dbfuncs.edit import (
    edit_email,
    edit_password,
    edit_both
)

router = APIRouter(
    prefix = "/edit",
    tags = ["Edit"]
)

@router.put("/")
async def edit(user:UserEdit.UserEdit):
    user = user.dict()
    
    if user["newEmail"] == '': 
        password = hash_password( user['newPass'])
        response = await edit_password(user['email'], password)


    elif user['newPass'] == '':
         response = await edit_email(user['email'], user['newEmail'])

    else:
       password = hash_password( user['newPass'])
       response = await edit_both(user['email'],user['newEmail'], password)

    return {"userModified": response}