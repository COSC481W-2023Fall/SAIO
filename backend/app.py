
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import DuplicateKeyError
from pydantic import BaseModel
from starlette.responses import JSONResponse
from passlib.context import CryptContext
from dotenv import load_dotenv

from models.TestModel import sample
import os

app = FastAPI()



# Import Database Functions
from DatabaseFunctions import (
    create_test,
    read_one_test,
    update_test,
    remove_test,
    check_email,
    check_password
)

# Origins
origins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:8000/',
    'https://saio-frontend-y2z2s.ondigitalocean.app/',
    'https://saio-frontend-y2z2s.ondigitalocean.app/app/'
]

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load environment variables from .env file
load_dotenv()

# Connect to MongoDB
MONGO_DB_URL = os.getenv("ConnectionString")
client = AsyncIOMotorClient(MONGO_DB_URL)
db = client["SAIO"]
users_collection = db["users"]

# Create a unique index on the email field
users_collection.create_index("email", unique=True)


# Create user model
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

@app.get("/")
def index():
    return {"message": "This is the index"}

@app.post("/account")
async def register(user: UserCreate):
    user_dict = user.dict()

    # Configure hashing algorithm
    password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    # Hash the user's password
    hashed_password = password_context.hash(user_dict['password'])
    user_dict['password'] = hashed_password

    try:
        inserted_user = await users_collection.insert_one(user_dict)
        return {"user_id": str(inserted_user.inserted_id), "message": "User registered successfully"}
    except DuplicateKeyError:
        return JSONResponse(content={"message": "Email is already in use"}, status_code=409)

#Home Root
@app.get("/")
def index():
    return {"message": "This is the index"}

@app.get("/api/check-email/{email}")
async def get_email(email: str):
   response = await check_email(email)
   return response

@app.get("/api/check-password/{password}")
async def get_password(password: str):
   response = await check_password(password)
   return response

# Create User
@app.post("/api/test", response_model=sample)
async def post_user(user:sample):
    response = await create_test(user.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong, bad request")

# Read 1 test
@app.get("/api/test/{name}", response_model=sample)
async def get_user_by_name(name):
    response = await read_one_test(name)
    if response:
        return response
    raise HTTPException(404, f"There is no test with this name: {name}")


# Update test
@app.put("/api/user/{name}", response_model=sample)
async def put_user(name:str, email: str, password:str):
    response = await update_test(name, email, password)
    if response:
        return response
    raise HTTPException(404, f"There is no Todo item with this title {id}")

# Delete test
@app.delete("/api/test/{name}/")
async def delete_user(name):
    response = await remove_test(name)
    if response:
        return "Successfully deleted User"
    raise HTTPException(404, f"There is no Todo item with this title {name}")


