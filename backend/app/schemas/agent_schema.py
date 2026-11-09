from marshmallow import fields
from app.extensions import ma
from app.models.agent import Agent

class AgentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Agent
        include_fk = True

    # Nested representation to prevent circular dependencies while retaining info
    user = fields.Nested('UserSchema', only=('id', 'first_name', 'last_name', 'email', 'avatar_url'))

class AgentUpdateSchema(ma.Schema):
    title = fields.String()
    bio = fields.String()
    specialization = fields.String()
    license_number = fields.String()
    years_experience = fields.Integer()
    phone = fields.String()
    whatsapp = fields.String()
