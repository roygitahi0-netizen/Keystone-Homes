from app.extensions import ma
from app.models import SavedSearch

class SavedSearchSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SavedSearch
        load_instance = True
        include_fk = True
