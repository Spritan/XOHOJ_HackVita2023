from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/notes/{notes_id}")
async def read_item(notes_id: int, q: str = None):
    return {"notes_id": notes_id, "q": q}