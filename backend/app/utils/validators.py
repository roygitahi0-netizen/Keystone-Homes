import re
import bleach

def validate_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

def validate_password(password):
    # min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
    if len(password) < 8:
        return False
    if not re.search(r'[A-Z]', password):
        return False
    if not re.search(r'[a-z]', password):
        return False
    if not re.search(r'\d', password):
        return False
    if not re.search(r'[^A-Za-z0-9]', password):
        return False
    return True

def sanitize_string(text, max_length=None):
    if not text:
        return text
    sanitized = bleach.clean(text, tags=[], attributes={}, strip=True)
    sanitized = sanitized.strip()
    if max_length and len(sanitized) > max_length:
        sanitized = sanitized[:max_length]
    return sanitized

def validate_phone(phone):
    pattern = r'^\+?1?\d{9,15}$'
    return re.match(pattern, phone) is not None

def validate_sort_field(field, allowed):
    return field if field in allowed else allowed[0] if allowed else None

def validate_pagination(page, per_page, max_per_page=50):
    try:
        page = int(page)
        if page < 1:
            page = 1
    except (TypeError, ValueError):
        page = 1
        
    try:
        per_page = int(per_page)
        if per_page < 1:
            per_page = 10
        elif per_page > max_per_page:
            per_page = max_per_page
    except (TypeError, ValueError):
        per_page = 10
        
    return page, per_page
