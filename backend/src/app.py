from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from paths import (
    index,
    login,
    test,
    signup
)

app = FastAPI()

# Origins
origins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://saio-frontend-y2z2s.ondigitalocean.app/'
]

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.include_router(index.router)
app.include_router(index.router)
app.include_router(login.router)
app.include_router(signup.router)
app.include_router(test.router) # remove everything for tests endpoint eventually