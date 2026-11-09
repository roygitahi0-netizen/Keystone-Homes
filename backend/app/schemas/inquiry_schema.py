from marshmallow import fields, validate
from app.extensions import ma
from app.models.inquiry import Inquiry

class InquirySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Inquiry
        include_fk = True

class InquiryCreateSchema(ma.Schema):
    name = fields.String(required=True)
    email = fields.Email(required=True)
    phone = fields.String()
    message = fields.String(required=True, validate=validate.Length(min=10))
    property_id = fields.Integer(required=True)
