from functools import wraps
from flask import request, current_app, g
import jwt
from app.models import User
from app.utils.helpers import error_response

def get_current_user():
    return getattr(g, 'current_user', None)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('access_token')
        if not token:
            return error_response('Token is missing!', 401)
        try:
            data = jwt.decode(token, current_app.config.get('SECRET_KEY', 'secret'), algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
            if not current_user:
                return error_response('Invalid token!', 401)
            g.current_user = current_user
        except jwt.ExpiredSignatureError:
            return error_response('Token has expired!', 401)
        except Exception as e:
            return error_response('Invalid token!', 401)
        return f(*args, **kwargs)
    return decorated

def admin_required(f):
    @wraps(f)
    @token_required
    def decorated(*args, **kwargs):
        current_user = get_current_user()
        if current_user.role != 'admin':
            return error_response('Admin privilege required!', 403)
        return f(*args, **kwargs)
    return decorated

def agent_required(f):
    @wraps(f)
    @token_required
    def decorated(*args, **kwargs):
        current_user = get_current_user()
        if current_user.role != 'agent':
            return error_response('Agent privilege required!', 403)
        return f(*args, **kwargs)
    return decorated

def ownership_required(model, id_param='id', user_id_field='user_id'):
    def decorator(f):
        @wraps(f)
        @token_required
        def decorated(*args, **kwargs):
            resource_id = kwargs.get(id_param)
            resource = model.query.get(resource_id)
            if not resource:
                return error_response('Resource not found', 404)
            current_user = get_current_user()
            if getattr(resource, user_id_field) != current_user.id and current_user.role != 'admin':
                return error_response('Ownership required!', 403)
            return f(*args, **kwargs)
        return decorated
    return decorator
