from src.models.student_model import Student
from dotenv import load_dotenv
import os

# Load secret connection string
load_dotenv()
connection_string = os.getenv("ConnectionString")

# MongoDB Driver
import motor.motor_asyncio
client = motor.motor_asyncio.AsyncIOMotorClient(connection_string)

# Create Database & Collection
database = client.SAIO
collection = database.students

# Create a Student
async def create_student(person):
    document = person
    result = await collection.insert_one(document)
    return document

# Read All Students
async def read_all_students():
    persons = []
    cursor = collection.find({})
    async for document in cursor:
        persons.append(Student(**document))
    return persons

