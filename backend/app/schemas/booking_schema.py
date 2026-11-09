from marshmallow import fields
from app.extensions import ma
from app.models.booking import Booking

class BookingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Booking
        include_fk = True

class BookingCreateSchema(ma.Schema):
    property_id = fields.Integer(required=True)
    check_in_date = fields.Date(required=True)
    check_out_date = fields.Date(required=True)
