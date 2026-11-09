import bleach
from flask import request
from app.utils.helpers import error_response

def apply_security_headers(response):
    response.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' fonts.gstatic.com"
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    return response

def sanitize_input(text):
    if not text:
        return text
    return bleach.clean(text, tags=[], attributes={}, strip=True).strip()

def validate_content_type(request):
    if request.method in ['POST', 'PUT', 'PATCH']:
        if not request.is_json:
            return error_response('Content-Type must be application/json', 415)
