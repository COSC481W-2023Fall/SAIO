from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from src.models.UserLogin import UserLogin
from src.models.Token import Token, TokenData
from src.paths.signup import verify_password
from datetime import datetime, timedelta
from typing import Annotated
from jose import  JWTError, jwt
from src.dbfuncs.login import (
    find_user
)

router = APIRouter(
    prefix = "/login",
    tags = ["Login"]
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload["email"]
        

        if payload is None:
            raise credentials_exception
        
        response = await find_user(email)
        
        if not response:
            raise credentials_exception
           
        
        return email
       

    except JWTError:
        raise credentials_exception
    



@router.post("/token")
async def login(user:UserLogin):
    user = user.dict()
    
    response = await find_user(user["email"])
    if not response:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    if not verify_password(user["password"], response['password']):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    token = create_access_token(user, timedelta(minutes=60))
    return   token