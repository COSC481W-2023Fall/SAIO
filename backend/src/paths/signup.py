from fastapi import APIRouter
from passlib.context import CryptContext
from src.models import UserCreate
from src.dbfuncs.signup import (
    insert_user
)

router = APIRouter(
    prefix = "/signup",
    tags = ["Signup"]
)

 # Configure hashing algorithm
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/")
async def register(user: UserCreate.UserCreate):
    user_dict = user.dict()

   # Hash the user's password
    hashed_password = password_context.hash(user_dict['password'])
    user_dict['password'] = hashed_password

    return await insert_user(user_dict)

def verify_password(plain_password, hashed_password):
    return password_context.verify(plain_password, hashed_password)

def hash_password(password):
    return password_context.hash(password)