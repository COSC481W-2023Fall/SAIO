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
'''''
# Create User
@app.post("/api/user", response_model=UserName)
async def post_user(user:UserName):
    response = await create_user(user.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong, bad request")

# Read 1 User
@app.get("/api/user{id}", response_model=UserName)
async def get_user_by_id(id):
    response = await read_one_user(id)
    if response:
        return response
    raise HTTPException(404, f"There is no User with this ID: {id}")


# Update User
@app.put("/api/user/{id}", response_model=UserName)
async def put_user(id:str, name:str):
    response = await update_user(id, name)
    if response:
        return response
    raise HTTPException(404, f"There is no Todo item with this title {id}")

# Delete User
@app.delete("/api/user/{id}/")
async def delete_user(id):
    response = await remove_user(id)
    if response:
        return "Successfully deleted User"
    raise HTTPException(404, f"There is no Todo item with this title {id}")

'''