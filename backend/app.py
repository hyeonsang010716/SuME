from flask import Flask
from dotenv import load_dotenv
import redis
import os

from api.main_views import bp
load_dotenv()


def create_app():
    app = Flask(__name__)

    app.config["REDIS_HOST"] = os.getenv("REDIS_HOST", "localhost")
    app.config["REDIS_PORT"] = int(os.getenv("REDIS_PORT", 6379))

    from api import register_blueprints
    register_blueprints(app)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=8001)