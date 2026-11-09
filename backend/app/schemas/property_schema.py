from marshmallow import fields, validate
from app.extensions import ma
from app.models.property import Property
from .agent_schema import AgentSchema

class PropertySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Property
        include_fk = True

    agent = fields.Nested(AgentSchema, only=('id', 'title', 'rating', 'phone'))

class PropertyCreateSchema(ma.Schema):
    title = fields.String(required=True, validate=validate.Length(min=5))
    description = fields.String(required=True)
    price = fields.Float(required=True, validate=validate.Range(min=0))
    listing_type = fields.String(required=True, validate=validate.OneOf(['sale', 'rent', 'short_term']))
    property_type = fields.String(required=True, validate=validate.OneOf(['apartment', 'house', 'villa', 'townhouse', 'commercial', 'land']))
    bedrooms = fields.Integer(validate=validate.Range(min=0), load_default=0)
    bathrooms = fields.Integer(validate=validate.Range(min=0), load_default=0)
    size_sqft = fields.Integer(validate=validate.Range(min=0))
    city = fields.String(required=True)
    address = fields.String()
    state = fields.String()
    zip_code = fields.String()
    country = fields.String()
    latitude = fields.Float()
    longitude = fields.Float()
    amenities = fields.List(fields.String())
    images = fields.List(fields.URL())
    video_url = fields.URL()
    virtual_tour_url = fields.URL()
    is_furnished = fields.Boolean()
    parking_spots = fields.Integer(validate=validate.Range(min=0))

class PropertyUpdateSchema(ma.Schema):
    title = fields.String(validate=validate.Length(min=5))
    description = fields.String()
    price = fields.Float(validate=validate.Range(min=0))
    status = fields.String(validate=validate.OneOf(['available', 'under_offer', 'sold', 'rented']))

class PropertySearchSchema(ma.Schema):
    q = fields.String()
    listing_type = fields.String(validate=validate.OneOf(['sale', 'rent', 'short_term']))
    property_type = fields.String()
    min_price = fields.Float(validate=validate.Range(min=0))
    max_price = fields.Float(validate=validate.Range(min=0))
    city = fields.String()
    bedrooms = fields.Integer(validate=validate.Range(min=0))
