from marshmallow import fields, validate
from app.extensions import ma
from app.models.review import Review

class ReviewSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Review
        include_fk = True

class ReviewCreateSchema(ma.Schema):
    agent_id = fields.Integer(required=True)
    rating = fields.Integer(required=True, validate=validate.Range(min=1, max=5))
    comment = fields.String(required=True, validate=validate.Length(min=10))
