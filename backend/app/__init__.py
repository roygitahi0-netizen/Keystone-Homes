from flask import Flask, jsonify
from app.extensions import db, migrate, ma, bcrypt, limiter, mail, cors
from config import config

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    bcrypt.init_app(app)
    limiter.init_app(app)
    mail.init_app(app)
    
    # Disable strict slashes to prevent 308 redirects that break CORS
    app.url_map.strict_slashes = False

    # Configure CORS - allow localhost, 127.0.0.1, and local network IPs with credentials
    cors.init_app(
        app,
        resources={
            r"/api/*": {
                "origins": [
                    r"http://localhost:\d+",
                    r"http://127\.0\.0\.1:\d+",
                    r"http://192\.168\.\d+\.\d+:\d+",
                    r"http://10\.\d+\.\d+\.\d+:\d+",
                    r"http://172\.(1[6-9]|2[0-9]|3[0-1])\.\d+\.\d+:\d+"
                ],
                "supports_credentials": True,
                "allow_headers": ["Content-Type", "Authorization", "X-XSRF-TOKEN"],
                "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
            }
        },
        supports_credentials=True
    )

    # Security Headers Hook
    @app.after_request
    def set_security_headers(response):
        response.headers['X-XSS-Protection'] = '1; mode=block'
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        return response

    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({"error": "Not Found"}), 404

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return jsonify({"error": "Internal Server Error"}), 500

    from app import models
    # Register blueprints
    from app.routes import register_blueprints
    register_blueprints(app)

    @app.route('/health')
    def health_check():
        return jsonify({"status": "ok"})

    return app
