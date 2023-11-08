from fastapi import APIRouter, HTTPException
from models.calendar_model import CalendarItem

# Create Router
router = APIRouter()

# Import Database Functions
from dbfuncs.calendar_db_funks import (
    create_calendar_item,
    read_one_calendar_item,
    read_all_calendar_items,
    update_calendar_item,
    remove_calendar_item
)

# Create ToDo
@router.post("/calendar", tags=["calendar"], response_model=CalendarItem)
async def post_calendar_item(calendar_item:CalendarItem):
    response = await create_calendar_item(calendar_item.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong, bad request") 


# Read 1 ToDo
@router.get("/calendar{title}", tags=["calendar"], response_model=CalendarItem)
async def get_calendar_item_by_id(title):
    response = await read_one_calendar_item(title)
    if response:
        return response
    raise HTTPException(404, f"There is no Calendar Item with this title: {title}")


# Read All ToDos
@router.get("/calendar", tags=["calendar"])
async def get_calendar_item():
    response = await read_all_calendar_items()
    return response


# Update ToDo
@router.put("/calendar/{title}", tags=["calendar"], response_model=CalendarItem)
async def put_calendar_item(title:str, start:str, end:str, allDay:bool, resource:str):
    response = await update_calendar_item(title, start, end, allDay, resource)
    if response:
        return response
    raise HTTPException(404, f"There is no Calendar Item with this title: {title}")


# Delete ToDo
@router.delete("/calendar/{title}", tags=["calendar"])
async def delete_calendar_item(title):
    response = await remove_calendar_item(title)
    if response:
        return "Successfully deleted Calendar item"
    raise HTTPException(404, f"There is no Calendar Item with this title: {title}")