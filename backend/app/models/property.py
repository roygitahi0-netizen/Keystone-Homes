from app.extensions import db

class Property(db.Model):
    __tablename__ = 'properties'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Numeric(12, 2), nullable=False)
    listing_type = db.Column(db.String(20), nullable=False) # sale, rent
    status = db.Column(db.String(20), default='available') # available, under_offer, sold, rented
    property_type = db.Column(db.String(50), nullable=False) # apartment, house, villa, townhouse, commercial, land
    bedrooms = db.Column(db.Integer, default=0)
    bathrooms = db.Column(db.Integer, default=0)
    size_sqft = db.Column(db.Integer)
    year_built = db.Column(db.Integer)
    address = db.Column(db.String(255))
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100))
    zip_code = db.Column(db.String(20))
    country = db.Column(db.String(100))
    latitude = db.Column(db.Numeric(10, 8))
    longitude = db.Column(db.Numeric(11, 8))
    amenities = db.Column(db.JSON)
    images = db.Column(db.JSON)
    video_url = db.Column(db.String(255))
    virtual_tour_url = db.Column(db.String(255))
    is_furnished = db.Column(db.Boolean, default=False)
    parking_spots = db.Column(db.Integer, default=0)
    is_verified = db.Column(db.Boolean, default=False)
    is_featured = db.Column(db.Boolean, default=False)
    
    agent_id = db.Column(db.Integer, db.ForeignKey('agents.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    # Relationships
    agent = db.relationship('Agent', back_populates='properties')
    category = db.relationship('Category', back_populates='properties')
    favorites = db.relationship('Favorite', back_populates='property', cascade='all, delete-orphan')
    inquiries = db.relationship('Inquiry', back_populates='property', cascade='all, delete-orphan')
    viewings = db.relationship('Viewing', back_populates='property', cascade='all, delete-orphan')
    bookings = db.relationship('Booking', back_populates='property', cascade='all, delete-orphan')
