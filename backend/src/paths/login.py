from fastapi import APIRouter
from pydantic import BaseModel
from passlib.context import CryptContext
from fastapi import HTTPException
from src.models import UserLogin
from src.paths.signup import verify_password
from src.dbfuncs.login import (
    find_user
)

router = APIRouter(
    prefix = "/login",
    tags = ["Login"]
)

@router.post("/token")
async def login(user:UserLogin.UserLogin):
    user = user.dict()
    
    response = await find_user(user["email"])
    if not response:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    if not verify_password(user["password"], response['password']):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    return   {"access_token": user["email"], "token_type": "bearer"}

