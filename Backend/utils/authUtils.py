import json
from pydantic import EmailStr
from datetime import timedelta, datetime

from fastapi import Header, HTTPException, status, Request

from core.config import pwd_context, jwt, SECRET_KEY, ALGORITHM
from core.errors.auth import IncorrectPass

from db.models.user import User


def get_password_hash(password: str) -> str:
    """
    Hashes a plaintext password using a secure hashing algorithm.

    Parameters:
    - password (str): The plaintext password to be hashed.

    Returns:
    - str: The hashed representation of the input password.

    Example:
    ```python
    hashed_password = get_password_hash("my_secure_password")
    print(hashed_password)
    ```
    """
    return pwd_context.hash(password)


def authenticate_user(email: EmailStr, password: str) -> bool:
    """
    Authenticate a user by checking the provided email and password.

    Parameters:
    - email (EmailStr): The email of the user to be authenticated.
    - password (str): The plaintext password to check against the stored hashed password.

    Returns:
    - bool: True if authentication is successful, False otherwise.

    Raises:
    - User.DoesNotExist: If the user with the provided email does not exist.
    - IncorrectPass: If the provided password is incorrect for the user.

    Example:
    ```python
    try:
        authentication_result = authenticate_user("user@example.com", "my_secure_password")
        if authentication_result:
            print("Authentication successful!")
        else:
            print("Authentication failed.")
    except User.DoesNotExist:
        print("User not found.")
    except IncorrectPass:
        print("Incorrect password.")
    ```
    """
    try:
        user = json.loads(User.objects.get(email=email).to_json())  # type: ignore
        password_check = pwd_context.verify(password, user["password"])
        if not password_check:
            raise IncorrectPass
        else:
            return True
    except User.DoesNotExist:  # type: ignore
        return False


def create_access_token(data: dict, expires_delta: timedelta) -> str:
    """
    Create an access token with the provided data and expiration duration.

    Parameters:
    - data (Dict): A dictionary containing the data to be encoded into the access token.
    - expires_delta (timedelta): The duration for which the access token should be valid.

    Returns:
    - str: The generated access token as a string.

    Example:
    ```python
    from datetime import timedelta

    token_data = {"sub": "user_id", "scopes": ["read", "write"]}
    expiration_duration = timedelta(minutes=30)
    access_token = create_access_token(token_data, expiration_duration)
    print(access_token)
    ```
    Note on `data`:
    - The `data` dictionary typically includes information about the user (e.g., user ID, roles, etc.) to be encoded into the token.
    - Example: `{"sub": "user_id", "scopes": ["read", "write"]}`
    """
    to_encode = data.copy()
    expires = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expires})
    encode_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)  # type: ignore
    return encode_jwt


def very_token_all(authorization: str = Header(...)) -> User:
    """
    Verify the authorization token in the request headers and retrieve the associated user.

    Parameters:
    - authorization (str): The authorization token in the format 'Bearer <token>'.

    Returns:
    - User: The user associated with the provided token.

    Raises:
    - HTTPException: If the token is missing or invalid.
    """
    try:
        token = authorization.split("Bearer ")[1]
        payload = jwt.decode(token=token, key=SECRET_KEY, algorithms=ALGORITHM)  # type: ignore
        user = User.objects.get(email=payload.get("sub"))  # type: ignore
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


def verify_token_all_cookie(req: Request) -> User:
    """
    Verify the access token in the request cookies and retrieve the associated user.

    Parameters:
    - req (Request): The FastAPI request object.

    Returns:
    - User: The user associated with the provided token.

    Raises:
    - HTTPException: If the token is missing or invalid.
    """
    try:
        token = req.cookies.get("access_token")
        if not token:
            raise HTTPException(status_code=401, detail="Missing access token")

        payload = jwt.decode(token=token, key=SECRET_KEY, algorithms=[ALGORITHM])  # type: ignore
        user = User.objects.get(email=payload.get("sub"))  # type: ignore

    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user
