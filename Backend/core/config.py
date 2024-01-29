from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Xohoj backend"
    admin_email: str = "proypabsab@gamil.com"

settings = Settings()