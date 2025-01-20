from flask import Blueprint
import redis

bp = Blueprint('main', __name__)

def register_blueprints(app):
    redis_host = app.config.get("REDIS_HOST", "localhost")
    redis_port = app.config.get("REDIS_PORT", 6379)
    cache = redis.Redis(host=redis_host, port=redis_port)

    app.config["CACHE"] = cache

    from .main_views import bp as main_bp
    app.register_blueprint(main_bp)