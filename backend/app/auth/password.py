# backend/app/auth/password.py

from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)


def hash_password(password: str) -> str:
    """
    Hash a plain-text password.
    bcrypt only supports passwords up to 72 bytes.
    """
    password_bytes = password.encode("utf-8")

    if len(password_bytes) > 72:
        raise ValueError("Password must be 72 bytes or fewer.")

    return pwd_context.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str,
) -> bool:
    """
    Verify a plain-text password against a stored hash.
    """
    password_bytes = plain_password.encode("utf-8")

    if len(password_bytes) > 72:
        return False

    return pwd_context.verify(
        plain_password,
        hashed_password,
    )