from marshmallow import fields, validate
from app.extensions import ma
from app.models.user import User
import re

def validate_password_complexity(p):
    if not re.search(r"[a-z]", p) or not re.search(r"[A-Z]", p) or not re.search(r"[0-9]", p):
        raise ma.ValidationError("Password must contain lowercase, uppercase, and a number.")

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        exclude = ('password_hash', 'email_verify_token', 'password_reset_token', 'failed_login_attempts', 'lockout_until')

class UserRegisterSchema(ma.Schema):
    email = fields.Email(required=True)
    password = fields.String(required=True, validate=[validate.Length(min=8), validate_password_complexity])
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    phone = fields.String()

class UserLoginSchema(ma.Schema):
    email = fields.Email(required=True)
    password = fields.String(required=True, validate=[validate.Length(max=255)])

class UserUpdateSchema(ma.Schema):
    first_name = fields.String()
    last_name = fields.String()
    phone = fields.String()
    avatar_url = fields.URL()

class PasswordResetSchema(ma.Schema):
    token = fields.String(required=True)
    new_password = fields.String(required=True, validate=[validate.Length(min=8), validate_password_complexity])
