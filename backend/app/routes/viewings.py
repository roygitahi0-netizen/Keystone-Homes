from flask import Blueprint, request
from app.extensions import db
from app.models import Viewing, Agent
from app.schemas import ViewingSchema, ViewingCreateSchema
from app.utils.helpers import api_response, error_response
from app.middleware.auth_middleware import token_required, get_current_user
import datetime

viewings_bp = Blueprint('viewings', __name__)
viewing_schema = ViewingSchema()
viewings_schema = ViewingSchema(many=True)

@viewings_bp.route('/', methods=['POST'])
@token_required
def create_viewing():
    data = request.get_json()
    errors = ViewingCreateSchema().validate(data)
    if errors:
        return error_response('Validation error', errors=errors)
        
    scheduled_at = datetime.datetime.fromisoformat(data['scheduled_at'].replace('Z', '+00:00'))
    if scheduled_at.tzinfo is not None:
        scheduled_at = scheduled_at.replace(tzinfo=None)
    
    if scheduled_at <= datetime.datetime.utcnow():
        return error_response('Scheduled time must be in the future', 400)
        
    user = get_current_user()
    try:
        viewing = Viewing(
            user_id=user.id,
            property_id=data['property_id'],
            scheduled_at=scheduled_at,
            status='pending'
        )
        db.session.add(viewing)
        db.session.commit()
        return api_response(viewing_schema.dump(viewing), 'Viewing created successfully', 201)
    except Exception:
        db.session.rollback()
        return error_response('Error creating viewing', 500)

@viewings_bp.route('/', methods=['GET'])
@token_required
def get_viewings():
    user = get_current_user()
    if user.role == 'agent':
        agent = Agent.query.filter_by(user_id=user.id).first()
        if agent:
            viewings = Viewing.query.join(Viewing.property).filter_by(agent_id=agent.id).all()
        else:
            viewings = []
    else:
        viewings = Viewing.query.filter_by(user_id=user.id).all()
    return api_response(viewings_schema.dump(viewings), 'Success')

@viewings_bp.route('/<int:id>', methods=['PATCH'])
@token_required
def update_viewing(id):
    viewing = Viewing.query.get_or_404(id)
    user = get_current_user()
    
    is_owner = viewing.user_id == user.id
    is_agent = user.role == 'agent' and viewing.property.agent.user_id == user.id
    
    if not (is_owner or is_agent):
        return error_response('Unauthorized', 403)
        
    data = request.get_json()
    if 'status' in data:
        try:
            viewing.status = data['status']
            db.session.commit()
            return api_response(viewing_schema.dump(viewing), 'Viewing updated successfully')
        except Exception:
            db.session.rollback()
            return error_response('Error updating viewing', 500)
    return api_response(viewing_schema.dump(viewing), 'No changes made')

@viewings_bp.route('/<int:id>', methods=['DELETE'])
@token_required
def cancel_viewing(id):
    viewing = Viewing.query.get_or_404(id)
    user = get_current_user()
    
    if viewing.user_id != user.id:
        return error_response('Unauthorized', 403)
        
    try:
        viewing.status = 'cancelled'
        db.session.commit()
        return '', 204
    except Exception:
        db.session.rollback()
        return error_response('Error cancelling viewing', 500)
