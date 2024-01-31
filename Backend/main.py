from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.mongodb_connect import connectDB

import core.config as core

# import settings, cors_middleware
from api import notes, auth
from utils.loggingUtils import logger
from docs.openApiTags import tags_metadata
from docs.openApiStatusCodes import AddedOpenAPiStatusCodes


# ------------------------ Init FastAPI -------------------------#
app = FastAPI(title=core.settings.app_name,openapi_tags=tags_metadata, responses=AddedOpenAPiStatusCodes) # type: ignore

connectDB()

app.add_middleware(
    CORSMiddleware,
    allow_origins=core.origins,  # type: ignore
    allow_credentials=core.allow_credentials,  # type: ignore
    allow_methods=["*"],  # type: ignore
    allow_headers=core.allow_headers,  # type: ignore
)

# ------------------------------Routes----------------------------#

## Notes
app.include_router(notes.router, prefix="/api/v2", tags=["Notes"])
app.include_router(auth.router, prefix="/api/v2", tags=["Auth"])
