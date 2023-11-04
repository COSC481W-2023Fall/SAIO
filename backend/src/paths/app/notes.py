from fastapi import APIRouter

router = APIRouter(
    prefix='/app/notes',
    tags=['Notes']
)

@router.post("")
async def create_note():
    pass

@router.get("")
async def read_note():
    pass

@router.patch("")
async def update_note():
    pass

@router.delete("")
async def delete_note():
    pass