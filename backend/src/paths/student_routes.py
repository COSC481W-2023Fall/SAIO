from fastapi import APIRouter, HTTPException
from src.models.student_model import Student

# Create Router
router = APIRouter()

# Import Database functions
from src.dbfuncs.student_db_funks import (
    create_student,
    read_all_students
)

# Create Student
@router.post("/student", tags=["student"], response_model=Student)
async def post_student(student:Student):
    response = await create_student(student.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong with create student request")

# Read All Students
@router.get("/student", tags=["student"])
async def get_student():
    response = await read_all_students()
    return response