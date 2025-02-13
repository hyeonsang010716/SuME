from api.views.main_views import bp as main_bp
from api.views.auth import auth_bp
from api.views.calendar import calendar_bp


def register_blueprint(app):
    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(calendar_bp)