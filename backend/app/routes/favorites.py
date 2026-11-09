from flask import Blueprint
from app.extensions import db
from app.models import Favorite, Property
from app.schemas import FavoriteSchema
from app.utils.helpers import api_response, error_response
from app.middleware.auth_middleware import token_required, get_current_user

favorites_bp = Blueprint('favorites', __name__)
favorites_schema = FavoriteSchema(many=True)

@favorites_bp.route('/', methods=['GET'])
@token_required
def get_favorites():
    user = get_current_user()
    favorites = Favorite.query.filter_by(user_id=user.id).all()
    return api_response(favorites_schema.dump(favorites), 'Success')

@favorites_bp.route('/<int:property_id>', methods=['POST'])
@token_required
def toggle_favorite(property_id):
    user = get_current_user()
    property = Property.query.get_or_404(property_id)
    
    favorite = Favorite.query.filter_by(user_id=user.id, property_id=property_id).first()
    try:
        if favorite:
            db.session.delete(favorite)
            db.session.commit()
            return api_response({'is_favorite': False}, 'Favorite removed')
        else:
            favorite = Favorite(user_id=user.id, property_id=property_id)
            db.session.add(favorite)
            db.session.commit()
            return api_response({'is_favorite': True}, 'Favorite added')
    except Exception:
        db.session.rollback()
        return error_response('Error toggling favorite', 500)
