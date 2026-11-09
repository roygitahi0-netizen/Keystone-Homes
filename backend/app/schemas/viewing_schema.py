from marshmallow import fields
from app.extensions import ma
from app.models.viewing import Viewing
from datetime import datetime, timezone

def must_be_future(value):
    if value.tzinfo is None:
        value = value.replace(tzinfo=timezone.utc)
    if value < datetime.now(timezone.utc):
        raise ma.ValidationError("Scheduled date must be in the future.")

class ViewingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Viewing
        include_fk = True

class ViewingCreateSchema(ma.Schema):
    property_id = fields.Integer(required=True)
    scheduled_at = fields.DateTime(required=True, validate=must_be_future)
    notes = fields.String()
