from flask import Blueprint, request
from app.extensions import db
from app.models import Property, Agent
from app.schemas import PropertySchema, PropertyCreateSchema, PropertyUpdateSchema
from app.utils.helpers import api_response, error_response, paginate_query
from app.utils.validators import validate_pagination, sanitize_string, validate_sort_field
from app.middleware.auth_middleware import token_required, agent_required, get_current_user

properties_bp = Blueprint('properties', __name__)
property_schema = PropertySchema()
properties_schema = PropertySchema(many=True)

@properties_bp.route('/', methods=['GET'])
def get_properties():
    page, per_page = validate_pagination(request.args.get('page'), request.args.get('per_page'))
    query = Property.query

    listing_type = request.args.get('listing_type')
    if listing_type:
        query = query.filter_by(listing_type=listing_type)
        
    property_type = request.args.get('property_type')
    if property_type:
        query = query.filter_by(property_type=property_type)
        
    status = request.args.get('status')
    if status:
        query = query.filter_by(status=status)
        
    min_price = request.args.get('min_price', type=float)
    if min_price is not None:
        query = query.filter(Property.price >= min_price)
        
    max_price = request.args.get('max_price', type=float)
    if max_price is not None:
        query = query.filter(Property.price <= max_price)
        
    bedrooms = request.args.get('bedrooms', type=int)
    if bedrooms is not None:
        query = query.filter(Property.bedrooms >= bedrooms)
        
    bathrooms = request.args.get('bathrooms', type=int)
    if bathrooms is not None:
        query = query.filter(Property.bathrooms >= bathrooms)
        
    city = request.args.get('city')
    if city:
        query = query.filter(Property.city.ilike(f"%{city}%"))
        
    state = request.args.get('state')
    if state:
        query = query.filter(Property.state.ilike(f"%{state}%"))
        
    is_featured = request.args.get('is_featured', type=bool)
    if is_featured is not None:
        query = query.filter_by(is_featured=is_featured)
        
    keyword = request.args.get('keyword')
    if keyword:
        query = query.filter(Property.title.ilike(f"%{keyword}%") | Property.description.ilike(f"%{keyword}%"))

    sort_param = request.args.get('sort') or request.args.get('sort_by')
    sort_by = validate_sort_field(sort_param, ['newest', 'price_asc', 'price_desc', 'size'])
    if sort_by == 'price_asc':
        query = query.order_by(Property.price.asc())
    elif sort_by == 'price_desc':
        query = query.order_by(Property.price.desc())
    elif sort_by == 'size':
        query = query.order_by(Property.size_sqft.desc())
    else:
        query = query.order_by(Property.created_at.desc())

    paginated = paginate_query(query, page, per_page)
    paginated['items'] = properties_schema.dump(paginated['items'])
    return api_response(paginated, 'Success')

@properties_bp.route('/<int:id>', methods=['GET'])
def get_property(id):
    property = Property.query.get_or_404(id)
    return api_response(property_schema.dump(property), 'Success')

@properties_bp.route('/', methods=['POST'])
@agent_required
def create_property():
    data = request.get_json()
    errors = PropertyCreateSchema().validate(data)
    if errors:
        return error_response('Validation error', errors=errors)
        
    user = get_current_user()
    agent = Agent.query.filter_by(user_id=user.id).first()
    if not agent:
        return error_response('Agent profile not found', 404)
        
    try:
        property = Property(**data)
        property.agent_id = agent.id
        property.title = sanitize_string(property.title)
        property.description = sanitize_string(property.description)
        db.session.add(property)
        db.session.commit()
        return api_response(property_schema.dump(property), 'Property created successfully', 201)
    except Exception as e:
        db.session.rollback()
        return error_response('Error creating property', 500)

@properties_bp.route('/<int:id>', methods=['PATCH'])
@token_required
def update_property(id):
    property = Property.query.get_or_404(id)
    user = get_current_user()
    
    if property.agent.user_id != user.id and user.role != 'admin':
        return error_response('Unauthorized', 403)
        
    data = request.get_json()
    errors = PropertyUpdateSchema(partial=True).validate(data)
    if errors:
        return error_response('Validation error', errors=errors)
        
    try:
        for key, value in data.items():
            if key in ['title', 'description']:
                value = sanitize_string(value)
            setattr(property, key, value)
        db.session.commit()
        return api_response(property_schema.dump(property), 'Property updated successfully')
    except Exception:
        db.session.rollback()
        return error_response('Error updating property', 500)

@properties_bp.route('/<int:id>', methods=['DELETE'])
@token_required
def delete_property(id):
    property = Property.query.get_or_404(id)
    user = get_current_user()
    
    if property.agent.user_id != user.id and user.role != 'admin':
        return error_response('Unauthorized', 403)
        
    try:
        db.session.delete(property)
        db.session.commit()
        return '', 204
    except Exception:
        db.session.rollback()
        return error_response('Error deleting property', 500)

@properties_bp.route('/featured', methods=['GET'])
def get_featured():
    properties = Property.query.filter_by(is_featured=True).limit(6).all()
    return api_response(properties_schema.dump(properties), 'Success')

@properties_bp.route('/<int:id>/similar', methods=['GET'])
def get_similar(id):
    property = Property.query.get_or_404(id)
    similar = Property.query.filter(
        (Property.id != id) & 
        ((Property.property_type == property.property_type) | (Property.city == property.city))
    ).limit(4).all()
    return api_response(properties_schema.dump(similar), 'Success')
