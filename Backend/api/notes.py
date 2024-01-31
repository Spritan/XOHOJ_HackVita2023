from fastapi import APIRouter, HTTPException


router = APIRouter(prefix="/notes")

@router.get("/{note_id}")
async def read_item(notes_id: int, q: str|None = None):
    return {"note_id": note_id, "q": q}