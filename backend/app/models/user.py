import jwt
from datetime import datetime, timedelta, timezone
from flask import current_app
from app.extensions import db, bcrypt

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, index=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20))
    role = db.Column(db.String(20), default='buyer') # buyer, seller, agent, admin
    google_id = db.Column(db.String(255), nullable=True)
    avatar_url = db.Column(db.String(255))
    email_verified = db.Column(db.Boolean, default=False)
    email_verify_token = db.Column(db.String(255))
    password_reset_token = db.Column(db.String(255))
    reset_token_expiry = db.Column(db.DateTime)
    failed_login_attempts = db.Column(db.Integer, default=0)
    lockout_until = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    # Relationships
    agent_profile = db.relationship('Agent', back_populates='user', uselist=False, cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', back_populates='user', cascade='all, delete-orphan')
    inquiries = db.relationship('Inquiry', back_populates='user', cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')
    saved_searches = db.relationship('SavedSearch', back_populates='user', cascade='all, delete-orphan')
    viewings = db.relationship('Viewing', back_populates='user', cascade='all, delete-orphan')
    bookings = db.relationship('Booking', back_populates='user', cascade='all, delete-orphan')

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password, 12).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def generate_email_token(self):
        payload = {'user_id': self.id, 'exp': datetime.now(timezone.utc) + timedelta(hours=24)}
        return jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')

    def generate_reset_token(self):
        payload = {'user_id': self.id, 'exp': datetime.now(timezone.utc) + timedelta(hours=1)}
        token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
        self.password_reset_token = token
        self.reset_token_expiry = datetime.now(timezone.utc) + timedelta(hours=1)
        return token

    @property
    def is_locked(self):
        if self.lockout_until and self.lockout_until.replace(tzinfo=timezone.utc) > datetime.now(timezone.utc):
            return True
        return False

    def increment_failed_login(self):
        self.failed_login_attempts += 1
        if self.failed_login_attempts >= 5:
            self.lockout_until = datetime.now(timezone.utc) + timedelta(minutes=15)

    def reset_failed_login(self):
        self.failed_login_attempts = 0
        self.lockout_until = None
