from flask import Blueprint, request
from app.extensions import db, limiter
from app.models import Inquiry, Property, Agent, User
from app.schemas import InquirySchema, InquiryCreateSchema
from app.utils.helpers import api_response, error_response, paginate_query
from app.utils.validators import sanitize_string
from app.utils.email import send_inquiry_notification
from app.middleware.auth_middleware import agent_required, get_current_user
from app.middleware.rate_limiter import inquiry_limit

inquiries_bp = Blueprint('inquiries', __name__)
inquiry_schema = InquirySchema()
inquiries_schema = InquirySchema(many=True)

@inquiries_bp.route('/', methods=['POST'])
@limiter.limit(inquiry_limit)
def create_inquiry():
    data = request.get_json()
    errors = InquiryCreateSchema().validate(data)
    if errors:
        return error_response('Validation error', errors=errors)
        
    try:
        inquiry = Inquiry(
            property_id=data['property_id'],
            name=sanitize_string(data['name']),
            email=sanitize_string(data['email']),
            phone=sanitize_string(data.get('phone')),
            message=sanitize_string(data['message'])
        )
        db.session.add(inquiry)
        db.session.commit()
        
        property = Property.query.get(data['property_id'])
        if property and property.agent and property.agent.user:
            send_inquiry_notification(inquiry, property.agent.user.email)
            
        return api_response(inquiry_schema.dump(inquiry), 'Inquiry created successfully', 201)
    except Exception as e:
        db.session.rollback()
        return error_response('Error creating inquiry', 500)

@inquiries_bp.route('/', methods=['GET'])
@agent_required
def get_inquiries():
    user = get_current_user()
    agent = Agent.query.filter_by(user_id=user.id).first()
    if not agent:
        return error_response('Agent not found', 404)
        
    inquiries = Inquiry.query.join(Property).filter(Property.agent_id == agent.id).all()
    return api_response(inquiries_schema.dump(inquiries), 'Success')

@inquiries_bp.route('/<int:id>', methods=['PATCH'])
@agent_required
def update_inquiry(id):
    inquiry = Inquiry.query.get_or_404(id)
    user = get_current_user()
    agent = Agent.query.filter_by(user_id=user.id).first()
    
    if inquiry.property.agent_id != agent.id:
        return error_response('Unauthorized', 403)
        
    data = request.get_json()
    if 'status' in data:
        try:
            inquiry.status = data['status']
            db.session.commit()
            return api_response(inquiry_schema.dump(inquiry), 'Inquiry updated successfully')
        except Exception:
            db.session.rollback()
            return error_response('Error updating inquiry', 500)
    return api_response(inquiry_schema.dump(inquiry), 'No changes made')
