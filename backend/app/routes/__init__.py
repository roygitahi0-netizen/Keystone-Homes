def register_blueprints(flask_app):
    from app.routes.auth import auth_bp
    from app.routes.properties import properties_bp
    from app.routes.agents import agents_bp
    from app.routes.inquiries import inquiries_bp
    from app.routes.reviews import reviews_bp
    from app.routes.favorites import favorites_bp
    from app.routes.viewings import viewings_bp
    from app.routes.categories import categories_bp
    from app.routes.bookings import bookings_bp

    flask_app.register_blueprint(bookings_bp)
    flask_app.register_blueprint(auth_bp, url_prefix='/api/auth')
    flask_app.register_blueprint(properties_bp, url_prefix='/api/properties')
    flask_app.register_blueprint(agents_bp, url_prefix='/api/agents')
    flask_app.register_blueprint(inquiries_bp, url_prefix='/api/inquiries')
    flask_app.register_blueprint(reviews_bp, url_prefix='/api/reviews')
    flask_app.register_blueprint(favorites_bp, url_prefix='/api/favorites')
    flask_app.register_blueprint(viewings_bp, url_prefix='/api/viewings')
    flask_app.register_blueprint(categories_bp, url_prefix='/api/categories')
