from pydantic import BaseModel

class CalendarItem(BaseModel):
    title: str
    start: str
    end: str
    allDay: bool
    resource: str