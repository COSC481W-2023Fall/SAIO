from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix = "/login",
    tags = ["Login"]
)