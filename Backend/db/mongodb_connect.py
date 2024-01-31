import os
from dotenv import load_dotenv

from mongoengine import connect, NotUniqueError
from utils.loggingUtils import logger

"""Utility file to connect to mongoDB cluster using mongoengine
"""
def connectDB()->None:
    load_dotenv()
    logger.debug({
            "db":os.getenv("DB"),
            "host":os.getenv("HOST"),
            "username":os.getenv("USERNAME"),
            "password":os.getenv("PASSWORD"),
        })
    try:
        connect(
            db=os.getenv("DB"),
            host=os.getenv("HOST"),
            username=os.getenv("USERNAME"),
            password=os.getenv("PASSWORD"),
        )
        logger.info("MongoDB connection successful!")
    except Exception as e:
        logger.critical(f"MongoDB connection failed. Error: {e}")