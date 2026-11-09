import os
from flask_mail import Message
from flask import render_template_string
from app.extensions import mail

FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:3000')

def send_verification_email(user):
    token = user.email_verify_token
    link = f"{FRONTEND_URL}/verify-email?token={token}"
    msg = Message("Verify Your Email", recipients=[user.email])
    html = f"<p>Hi {user.first_name},</p><p>Please verify your email by clicking <a href='{link}'>here</a>.</p>"
    msg.html = html
    try:
        mail.send(msg)
    except Exception as e:
        print(f"Error sending email: {e}")

def send_password_reset_email(user):
    token = user.password_reset_token
    link = f"{FRONTEND_URL}/reset-password?token={token}"
    msg = Message("Reset Your Password", recipients=[user.email])
    html = f"<p>Hi {user.first_name},</p><p>Reset your password by clicking <a href='{link}'>here</a>.</p>"
    msg.html = html
    try:
        mail.send(msg)
    except Exception as e:
        print(f"Error sending email: {e}")

def send_inquiry_notification(inquiry, agent_email):
    msg = Message("New Property Inquiry", recipients=[agent_email])
    html = f"<p>You have a new inquiry from {inquiry.name} ({inquiry.email}) for property ID {inquiry.property_id}.</p><p>{inquiry.message}</p>"
    msg.html = html
    try:
        mail.send(msg)
    except Exception as e:
        print(f"Error sending email: {e}")
