from flask import Blueprint, request
from app.extensions import db
from app.models import Agent
from app.schemas import AgentSchema
from app.utils.helpers import api_response, error_response, paginate_query
from app.utils.validators import validate_pagination
from app.middleware.auth_middleware import token_required, get_current_user

agents_bp = Blueprint('agents', __name__)
agent_schema = AgentSchema()
agents_schema = AgentSchema(many=True)

@agents_bp.route('/', methods=['GET'])
def get_agents():
    page, per_page = validate_pagination(request.args.get('page'), request.args.get('per_page'))
    query = Agent.query
    paginated = paginate_query(query, page, per_page)
    paginated['items'] = agents_schema.dump(paginated['items'])
    return api_response(paginated, 'Success')

@agents_bp.route('/<int:id>', methods=['GET'])
def get_agent(id):
    agent = Agent.query.get_or_404(id)
    return api_response(agent_schema.dump(agent), 'Success')

@agents_bp.route('/<int:id>', methods=['PATCH'])
@token_required
def update_agent(id):
    agent = Agent.query.get_or_404(id)
    user = get_current_user()
    
    if agent.user_id != user.id and user.role != 'admin':
        return error_response('Unauthorized', 403)
        
    data = request.get_json()
    try:
        for key, value in data.items():
            if hasattr(agent, key):
                setattr(agent, key, value)
        db.session.commit()
        return api_response(agent_schema.dump(agent), 'Agent updated successfully')
    except Exception:
        db.session.rollback()
        return error_response('Error updating agent', 500)
