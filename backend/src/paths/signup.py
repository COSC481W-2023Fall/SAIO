from fastapi import APIRouter
from passlib.context import CryptContext
from src.models import UserCreate
from src.dbfuncs.signup import (
    insert_user,
    check_email,
    check_password
)

router = APIRouter(
    prefix = "/signup",
    tags = ["Signup"]
)

@router.post("/")
async def register(user: UserCreate.UserCreate):
    user_dict = user.dict()

    # Configure hashing algorithm
    password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    # Hash the user's password
    hashed_password = password_context.hash(user_dict['password'])
    user_dict['password'] = hashed_password

    return await insert_user(user_dict)

@router.get("/check-email/{email}")
async def get_email(email: str):
   response = await check_email(email)
   return response

@router.get("/check-password/{password}")
async def get_password(password: str):
   response = await check_password(password)
   return response