from api.views.main_views import bp as main_bp
from api.views.auth import auth_bp


def register_blueprint(app):
    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp)