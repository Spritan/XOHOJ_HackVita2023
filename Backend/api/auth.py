from datetime import timedelta
import json
import traceback

from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import JSONResponse

from db.models.user import User
from db.mongodb_connect import NotUniqueError

from schemas.userschemas import LoginRequestBody, newUser
from utils.authUtils import authenticate_user, create_access_token, get_password_hash

router = APIRouter(prefix="/auth")

@router.post("/signup")
def signup(new_user: newUser) -> JSONResponse:
    """
    Register a new user.

    Parameters:
    - new_user (newUser): The data for creating a new user.

    Returns:
    - JSONResponse: A JSON response containing a message and user type.

    Raises:
    - 401, JSONResponse: If the email or phone number already has an account (status code 400).
    - 501, JSONResponse: If any other error occurs during the registration process (status code 500).
    """
    if new_user.user_type is None:
        new_user.user_type = "user"

    try:
        user = User(
            fname=new_user.fname,
            lname=new_user.lname,
            email=new_user.email,
            phone_number=new_user.phone_number,
            password=get_password_hash(new_user.password),
            user_type=new_user.user_type,
        )
        user.save()

        return JSONResponse({
            "message": f"New user, {user.fname} with mail {user.email} added",
            "user_type": user.user_type,
        })
    except NotUniqueError:
        error_message = {
            "detail": f"Email or phone number already has an account.",
        }
        return JSONResponse(content=error_message, status_code=401) # type: ignore
    except Exception as e:
        traceback_str = traceback.format_exc()
        error_message = {
            "detail": f"An error occurred: {str(e)}",
            "traceback": traceback_str,
        }
        return JSONResponse(content=error_message, status_code=501)  # type: ignore
    
@router.post("/signup_admin")
def signup_admin(newUser: newUser):
    """
    Register a new user with the 'director' user type.

    Parameters:
    - newUser (newUser): The data for creating a new user.

    Returns:
    - JSONResponse: A JSON response containing a message and user type.

    Raises:
    - 401, JSONResponse: If the email or phone number already has an account (status code 401).
    - 501, JSONResponse: If any other error occurs during the registration process (status code 501).
    """
    if newUser.user_type is None:
        newUser.user_type = 'director'
    try:
        user = User(
            fname=newUser.fname,
            lname=newUser.lname,
            email=newUser.email,
            phone_number=newUser.phone_number,
            password=get_password_hash(newUser.password),
            user_type=newUser.user_type,
        )
        user.save()

        return JSONResponse({
            "message": f"New user, {user.fname} with mail {user.email} added",
            "user_type": user.user_type,
        })
    except NotUniqueError:
        error_message = {
            "detail": f"Email or phone number already has an account.",
        }
        return JSONResponse(content=error_message, status_code=401) # type: ignore
    except Exception as e:
        traceback_str = traceback.format_exc()
        error_message = {
            "detail": f"An error occurred: {str(e)}",
            "traceback": traceback_str,
        }
        return JSONResponse(content=error_message, status_code=501)  # type: ignore

@router.post("/login")
def login(request_body: LoginRequestBody, response: Response) -> dict[str, str|int]| None:
    """
    Log in a user.

    Parameters:
    - request_body (LoginRequestBody): The login request body containing email and password.
    - response (Response): The FastAPI Response object for setting cookies.

    Returns:
    - dict: A dictionary containing the access token, user email, and user type.
      If authentication fails, returns None.

    Raises:
    - HTTPException: If incorrect email or password is provided (status code 400).
    """
    email = request_body.email
    password = request_body.password

    if authenticate_user(email, password):
        access_token = create_access_token(
            data={"sub": email}, expires_delta=timedelta(minutes=30)
        )
        user = json.loads(User.objects.get(email=email).to_json()) # type: ignore
        response.set_cookie(
            key="access_token",
            value=access_token,
            expires=timedelta(minutes=30), # type: ignore
            httponly=True,  # This ensures the cookie is only accessible via HTTP
            samesite="lax",  # Adjust this according to your security needs
        )
        return {"token": access_token, "user": email, "user_type":f"{user['user_type']}" }
    else:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
@router.delete("/logout")
def logout(response: Response) -> JSONResponse:
    """
    Log out a user.

    Parameters:
    - response (Response): The FastAPI Response object for deleting cookies.

    Returns:
    - JSONResponse: A json containing a message confirming successful logout.
    """
    response.delete_cookie(
        key="access_token",
        path="/",
    )
    return JSONResponse({"message": "Logged out successfully"})
