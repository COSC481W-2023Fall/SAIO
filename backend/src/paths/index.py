from fastapi import APIRouter
from fastapi.responses import RedirectResponse

router = APIRouter(
    prefix = "",
)

@router.get("/", include_in_schema=False)
def index():
    return RedirectResponse("/docs")