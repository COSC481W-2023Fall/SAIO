from fastapi import APIRouter, HTTPException
from src.models.calendar_model import CalendarItem
from src.paths.login import get_current_user
# Create Router
router = APIRouter()

# Import Database Functions
from src.dbfuncs.calendar_db_funks import (
    create_calendar_item,
    read_one_calendar_item,
    read_all_calendar_items,
    update_calendar_item,
    remove_calendar_item,
    patch_calendar_item
)

# Create Calendar Item
@router.post("/app/calendar", tags=["calendar"], response_model=CalendarItem)
async def post_calendar_item(calendar_item:CalendarItem):
    calendar_item = calendar_item.dict()
    calendar_item['email'] = await get_current_user(calendar_item['email'])
    response = await create_calendar_item(calendar_item)
    if response:
        return response
    raise HTTPException(400, "Something went wrong, bad request") 


# Read 1 Calendar Item
@router.get("/app/calendar/{title}", tags=["calendar"], response_model=CalendarItem)
async def get_calendar_item_by_id(title):
    response = await read_one_calendar_item(title)
    if response:
        return response
    raise HTTPException(404, f"There is no Calendar Item with this title: {title}")


# Read All Calendar Items for a user 
@router.get("/app/calendar{email}", tags=["calendar"])
async def get_calendar_item(email):
    email = await get_current_user(email)
    response = await read_all_calendar_items(email)
    return response


# Update Calendar Item
@router.put("/app/calendar/{title}", tags=["calendar"], response_model=CalendarItem)
async def put_calendar_item(calendar_item:CalendarItem):
    response = await update_calendar_item(calendar_item.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong, bad request") 


# Patch Calendar Item
@router.patch("/app/calendar/{title}", tags=["calendar"], response_model=CalendarItem)
async def patch_item(title, start, end, allDay, resource):
    response = await patch_calendar_item(title, start, end, allDay, resource)
    if response:
        return response
    raise HTTPException(404, f"There is no Calendar Item with this title: {title}")


# Delete Calendar Item
@router.delete("/app/calendar/{title}", tags=["calendar"])
async def delete_calendar_item(title):
    response = await remove_calendar_item(title)
    if response:
        return "Successfully deleted Calendar item"
    raise HTTPException(404, f"There is no Calendar Item with this title: {title}")