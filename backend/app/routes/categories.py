from flask import Blueprint
from app.models import Category
from app.schemas import CategorySchema
from app.utils.helpers import api_response

categories_bp = Blueprint('categories', __name__)
categories_schema = CategorySchema(many=True)

@categories_bp.route('/', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return api_response(categories_schema.dump(categories), 'Success')
