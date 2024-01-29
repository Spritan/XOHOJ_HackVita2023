import pprint
import logging
import colorlog
import traceback
from pprint import pformat
from dotenv import load_dotenv

from typing import Union

from fastapi import FastAPI
from fastapi.logger import logger
from fastapi.middleware.cors import CORSMiddleware

from api import notes
from core.config import settings
from core.metadata import tags_metadata

# ------------------------ Init FastAPI -------------------------#
app = FastAPI(title=settings.app_name)

# -------------------------CORS Config---------------------------#
load_dotenv()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------logger Config---------------------------#
handler = logging.StreamHandler()
logging.getLogger().setLevel(logging.DEBUG)
handler.setFormatter(
    colorlog.ColoredFormatter(
        "%(log_color)s%(levelname)-8s%(reset)s - %(asctime)s - %(message)s",
        log_colors={
            "DEBUG": "cyan",
            "INFO": "green",
            "WARNING": "yellow",
            "ERROR": "red",
            "CRITICAL": "red,bg_white",
        },
        datefmt="%Y-%m-%d %H:%M:%S",
    )
)
logger.addHandler(handler)

# ------------------------------Routes----------------------------#

app.include_router(notes.router, prefix="/api/v2/notes", tags=["notes"])

