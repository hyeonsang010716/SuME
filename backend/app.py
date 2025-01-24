from flask import Flask
from dotenv import load_dotenv
import redis
import os

from api.main_views import bp
from db import init_app, db
load_dotenv()


def create_app():
    app = Flask(__name__)

    app.config["REDIS_HOST"] = os.getenv("REDIS_HOST", "localhost")
    app.config["REDIS_PORT"] = int(os.getenv("REDIS_PORT", 6379))

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    init_app(app)

    from api import register_blueprints
    register_blueprints(app)

    with app.app_context():
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=8001)