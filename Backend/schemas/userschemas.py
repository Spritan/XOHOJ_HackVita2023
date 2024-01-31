from pydantic import BaseModel, EmailStr

class newUser(BaseModel):
    fname: str
    lname: str
    email: EmailStr
    phone_number: str
    password:str
    user_type: str|None
    
class LoginRequestBody(BaseModel):
    email: EmailStr
    password: str