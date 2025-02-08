from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
import logging
import os


from models.stt.google_cloude import rInit_GoogleCloudeSTT
from api.config import config
from api.models import db


load_dotenv()
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

    from api.models.audio import Audio

    with app.app_context():
        db.create_all()

    # Blueprint 연결
    from api.views import register_blueprint
    register_blueprint(app)

    return app

if __name__ == "__main__":
    load_dotenv()
    app = create_app()
    rInit_GoogleCloudeSTT()
    app.run(host="0.0.0.0", port=5000, debug=True)