from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware


# Start API Object
app = FastAPI()

# Import Database Functions

from DatabaseFunctions import (
    check_email,
    check_password
)

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
