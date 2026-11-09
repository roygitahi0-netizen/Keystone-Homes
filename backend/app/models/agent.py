from app.extensions import db

class Agent(db.Model):
    __tablename__ = 'agents'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    title = db.Column(db.String(100))
    bio = db.Column(db.Text)
    specialization = db.Column(db.String(255))
    license_number = db.Column(db.String(100))
    years_experience = db.Column(db.Integer)
    deals_closed = db.Column(db.Integer, default=0)
    rating = db.Column(db.Numeric(3, 2), default=0.0)
    phone = db.Column(db.String(20))
    whatsapp = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=db.func.now())

    # Relationships
    user = db.relationship('User', back_populates='agent_profile')
    properties = db.relationship('Property', back_populates='agent')
    reviews = db.relationship('Review', back_populates='agent')
    viewings = db.relationship('Viewing', back_populates='agent')
