from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
import logging
import os

from api.config import config


load_dotenv()
db = SQLAlchemy()
migrate = Migrate()


def create_app():
    app = Flask(__name__)

    CORS(app)
    logging.basicConfig(level=logging.DEBUG)

    # 환경 변수 정의
    env = os.getenv("FLASK_ENV", "default")
    app.config.from_object(config[env])

    # DATABASE 초기화 및 생성
    db.init_app(app)
    migrate.init_app(app)

    with app.app_context():
        db.create_all()

    # Blueprint 연결
    from api.main_views import bp
    app.register_blueprint(bp)

    return app