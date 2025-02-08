from api.views.main_views import bp as main_bp


def register_blueprint(app):
    app.register_blueprint(main_bp)