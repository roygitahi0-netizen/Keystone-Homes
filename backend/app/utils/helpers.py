from flask import jsonify

def api_response(data=None, message='', status=200):
    return jsonify({
        'status': 'success' if status < 400 else 'error',
        'message': message,
        'data': data
    }), status

def error_response(message, status=400, errors=None):
    response = {
        'status': 'error',
        'message': message
    }
    if errors:
        response['errors'] = errors
    return jsonify(response), status

def paginate_query(query, page, per_page):
    paginated = query.paginate(page=page, per_page=per_page, error_out=False)
    return {
        'items': paginated.items,
        'total': paginated.total,
        'page': paginated.page,
        'per_page': paginated.per_page,
        'pages': paginated.pages,
        'has_next': paginated.has_next,
        'has_prev': paginated.has_prev
    }

def log_auth_event(event_type, user_id, ip_address, success):
    from flask import current_app
    current_app.logger.info(f"Auth Event: {event_type} | User ID: {user_id} | IP: {ip_address} | Success: {success}")
