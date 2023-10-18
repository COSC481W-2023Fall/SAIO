from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import DuplicateKeyError
from pydantic import BaseModel
from starlette.responses import JSONResponse
from passlib.context import CryptContext
from dotenv import load_dotenv
import os

app = FastAPI()

# Origins
origins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:8000/'
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
MONGO_DB_URL = os.getenv("MONGO_DB_URL")
client = AsyncIOMotorClient(MONGO_DB_URL)
db = client["SAIO"]
users_collection = db["test"]

# Create a unique index on the email field
users_collection.create_index("email", unique=True)
users_collection.create_index([("email", 1)], unique=True)

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
