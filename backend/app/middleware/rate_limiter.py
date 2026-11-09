from flask import request

def get_remote_address():
    return request.remote_addr

login_limit = '10/minute'
register_limit = '5/hour'
forgot_password_limit = '3/hour'
inquiry_limit = '5/hour'
api_limit = '100/minute'
search_limit = '30/minute'
