from typing import Optional
from pydantic import BaseModel, UUID4
from datetime import datetime

from fastapi import UploadFile

class NotesBase(BaseModel):
    url:str
    Topic:str
    title:str
    timestamped:str
    currentTime:datetime
    content:str
    copied:str
    snaped: Optional[UploadFile] = None
    createdAt:datetime
    updatedAt:datetime
    
class NotesCreate(NotesBase):
    pass

class Notes(NotesBase):
    id: UUID4