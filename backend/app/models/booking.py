from app.extensions import db

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=False)
    check_in_date = db.Column(db.Date, nullable=False)
    check_out_date = db.Column(db.Date, nullable=False)
    total_price = db.Column(db.Numeric(12, 2), nullable=False)
    status = db.Column(db.String(20), default='pending') # pending, confirmed, cancelled
    payment_intent_id = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=db.func.now())

    user = db.relationship('User', back_populates='bookings')
    property = db.relationship('Property', back_populates='bookings')
