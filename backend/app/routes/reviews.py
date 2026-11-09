from flask import Blueprint, request
from app.extensions import db
from app.models import Review, Agent
from app.schemas import ReviewSchema, ReviewCreateSchema
from app.utils.helpers import api_response, error_response, paginate_query
from app.utils.validators import validate_pagination, sanitize_string
from app.middleware.auth_middleware import token_required, get_current_user

reviews_bp = Blueprint('reviews', __name__)
review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)

@reviews_bp.route('/', methods=['POST'])
@token_required
def create_review():
    data = request.get_json()
    errors = ReviewCreateSchema().validate(data)
    if errors:
        return error_response('Validation error', errors=errors)
        
    user = get_current_user()
    agent_id = data['agent_id']
    
    existing = Review.query.filter_by(user_id=user.id, agent_id=agent_id).first()
    if existing:
        return error_response('You have already reviewed this agent', 400)
        
    try:
        review = Review(
            user_id=user.id,
            agent_id=agent_id,
            rating=data['rating'],
            comment=sanitize_string(data.get('comment'))
        )
        db.session.add(review)
        db.session.commit()
        return api_response(review_schema.dump(review), 'Review created successfully', 201)
    except Exception:
        db.session.rollback()
        return error_response('Error creating review', 500)

@reviews_bp.route('/agent/<int:agent_id>', methods=['GET'])
def get_agent_reviews(agent_id):
    page, per_page = validate_pagination(request.args.get('page'), request.args.get('per_page'))
    query = Review.query.filter_by(agent_id=agent_id)
    paginated = paginate_query(query, page, per_page)
    paginated['items'] = reviews_schema.dump(paginated['items'])
    return api_response(paginated, 'Success')

@reviews_bp.route('/<int:id>', methods=['DELETE'])
@token_required
def delete_review(id):
    review = Review.query.get_or_404(id)
    user = get_current_user()
    
    if review.user_id != user.id and user.role != 'admin':
        return error_response('Unauthorized', 403)
        
    try:
        db.session.delete(review)
        db.session.commit()
        return '', 204
    except Exception:
        db.session.rollback()
        return error_response('Error deleting review', 500)
