import os
from pydantic_settings import BaseSettings

from jose import jwt
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer

# App config
class Settings(BaseSettings):
    app_name: str = "Xohoj backend"
    admin_email: str = "proypabsab@gamil.com"

settings = Settings()

# CORS config
origins = ["*"]
allow_credentials=True,
# allow_methods=,
allow_headers=["Content-Type", "Authorization", "Set-Cookie"]

# Cryptygraphic config
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")