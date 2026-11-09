from flask import Blueprint, request, current_app, make_response
from app.extensions import db, bcrypt, limiter
from app.models import User
from app.schemas import UserSchema, UserRegisterSchema, UserLoginSchema
from app.utils.helpers import api_response, error_response, log_auth_event
from app.utils.email import send_verification_email, send_password_reset_email
from app.middleware.auth_middleware import token_required, get_current_user
from app.middleware.rate_limiter import login_limit, register_limit, forgot_password_limit
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import jwt
import datetime
import secrets

auth_bp = Blueprint('auth', __name__)
user_schema = UserSchema(exclude=['password_hash', 'email_verify_token', 'password_reset_token'])

@auth_bp.route('/register', methods=['POST'])
@limiter.limit(register_limit)
def register():
    data = request.get_json()
    errors = UserRegisterSchema().validate(data)
    if errors:
        return error_response('Validation error', errors=errors)
        
    if User.query.filter_by(email=data['email']).first():
        return error_response('Email already registered', 409)
        
    try:
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user = User(
            email=data['email'],
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            password_hash=hashed_password,
            email_verify_token=secrets.token_urlsafe(32)
        )
        db.session.add(user)
        db.session.commit()
        
        send_verification_email(user)
        return api_response(user_schema.dump(user), 'Registration successful', 201)
    except Exception as e:
        import traceback
        traceback.print_exc()
        db.session.rollback()
        return error_response(f'Registration failed: {str(e)}', 500)

@auth_bp.route('/login', methods=['POST'])
@limiter.limit(login_limit)
def login():
    data = request.get_json()
    errors = UserLoginSchema().validate(data)
    if errors:
        return error_response('Validation error', errors=errors)
        
    user = User.query.filter_by(email=data['email']).first()
    ip_addr = request.remote_addr
    
    if not user:
        log_auth_event('login', None, ip_addr, False)
        return error_response('Invalid credentials', 401)
        
    if user.is_locked:
        return error_response('Account locked due to too many failed attempts', 403)
        
    if not bcrypt.check_password_hash(user.password_hash, data['password']):
        user.increment_failed_login()
        db.session.commit()
        log_auth_event('login', user.id, ip_addr, False)
        return error_response('Invalid credentials', 401)
        
    user.reset_failed_login()
    db.session.commit()
    log_auth_event('login', user.id, ip_addr, True)
    
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }, current_app.config.get('SECRET_KEY', 'secret'), algorithm='HS256')
    
    resp = make_response(api_response(user_schema.dump(user), 'Login successful')[0])
    resp.set_cookie('access_token', token, httponly=True, secure=True, samesite='Lax', max_age=86400)
    return resp

@auth_bp.route('/logout', methods=['POST'])
def logout():
    resp = make_response(api_response(None, 'Logout successful')[0])
    resp.set_cookie('access_token', '', expires=0)
    return resp

@auth_bp.route('/google', methods=['POST'])
def google_auth():
    data = request.get_json()
    token = data.get('id_token')
    if not token:
        return error_response('Token missing', 400)
        
    try:
        idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), current_app.config.get('GOOGLE_CLIENT_ID'))
        email = idinfo['email']
        user = User.query.filter_by(email=email).first()
        if not user:
            user = User(
                email=email,
                first_name=idinfo.get('given_name', ''),
                last_name=idinfo.get('family_name', ''),
                google_id=idinfo['sub'],
                email_verified=True
            )
            db.session.add(user)
            db.session.commit()
            
        jwt_token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }, current_app.config.get('SECRET_KEY', 'secret'), algorithm='HS256')
        
        resp = make_response(api_response(user_schema.dump(user), 'Google login successful')[0])
        resp.set_cookie('access_token', jwt_token, httponly=True, secure=True, samesite='Lax', max_age=86400)
        return resp
    except Exception as e:
        return error_response('Invalid Google token', 401)

@auth_bp.route('/verify-email/<token>', methods=['GET'])
def verify_email(token):
    user = User.query.filter_by(email_verify_token=token).first()
    if not user:
        return error_response('Invalid token', 400)
        
    try:
        user.email_verified = True
        user.email_verify_token = None
        db.session.commit()
        return api_response(None, 'Email verified successfully')
    except Exception:
        db.session.rollback()
        return error_response('Error verifying email', 500)

@auth_bp.route('/forgot-password', methods=['POST'])
@limiter.limit(forgot_password_limit)
def forgot_password():
    data = request.get_json()
    email = data.get('email')
    user = User.query.filter_by(email=email).first()
    if user:
        try:
            user.password_reset_token = secrets.token_urlsafe(32)
            user.password_reset_expires = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            db.session.commit()
            send_password_reset_email(user)
            log_auth_event('forgot_password', user.id, request.remote_addr, True)
        except Exception:
            db.session.rollback()
    return api_response(None, 'If an account exists, a password reset link has been sent.')

@auth_bp.route('/reset-password/<token>', methods=['POST'])
@limiter.limit(forgot_password_limit)
def reset_password(token):
    data = request.get_json()
    new_password = data.get('password')
    user = User.query.filter_by(password_reset_token=token).first()
    
    if not user or not user.password_reset_expires or user.password_reset_expires < datetime.datetime.utcnow():
        return error_response('Invalid or expired token', 400)
        
    try:
        user.password_hash = bcrypt.generate_password_hash(new_password).decode('utf-8')
        user.password_reset_token = None
        user.password_reset_expires = None
        db.session.commit()
        log_auth_event('reset_password', user.id, request.remote_addr, True)
        return api_response(None, 'Password reset successful')
    except Exception:
        db.session.rollback()
        return error_response('Error resetting password', 500)

@auth_bp.route('/me', methods=['GET'])
def get_me():
    token = request.cookies.get('access_token')
    if not token:
        return api_response(None, 'Not authenticated', 200)
    try:
        data = jwt.decode(token, current_app.config.get('SECRET_KEY', 'secret'), algorithms=['HS256'])
        current_user = User.query.get(data['user_id'])
        if not current_user:
            return api_response(None, 'Not authenticated', 200)
        return api_response(user_schema.dump(current_user), 'Success')
    except Exception:
        return api_response(None, 'Not authenticated', 200)

@auth_bp.route('/refresh', methods=['POST'])
def refresh():
    token = request.cookies.get('access_token')
    if not token:
        return error_response('Token missing', 401)
    try:
        data = jwt.decode(token, current_app.config.get('SECRET_KEY', 'secret'), algorithms=['HS256'], options={"verify_exp": False})
        user = User.query.get(data['user_id'])
        if not user:
            return error_response('Invalid token', 401)
        
        new_token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }, current_app.config.get('SECRET_KEY', 'secret'), algorithm='HS256')
        
        resp = make_response(api_response(None, 'Token refreshed')[0])
        resp.set_cookie('access_token', new_token, httponly=True, secure=True, samesite='Lax', max_age=86400)
        return resp
    except Exception:
        return error_response('Invalid token', 401)
