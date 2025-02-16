from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from flask import request
import logging
import os

from models.stt.google_cloude import rInit_GoogleCloudeSTT
from models.summary.gemini_summary import rInit_Graph
from api.config import config
from api.models import db


load_dotenv()


def create_app():
    app = Flask(__name__)

    CORS(app, origins=["*"])
    
    # 로그 설정 추가
    logging.basicConfig(
        level=logging.DEBUG,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[
            logging.FileHandler("app.log"),  # 파일로 로그 저장
            logging.StreamHandler()  # 터미널 출력
        ]
    )
    
    logger = logging.getLogger(__name__)
    logger.info("Flask Application Starting...")

    # werkzeug 로거 활성화
    werkzeug_logger = logging.getLogger("werkzeug")
    werkzeug_logger.setLevel(logging.DEBUG)
    werkzeug_logger.addHandler(logging.StreamHandler())  # 콘솔에 출력
    werkzeug_logger.addHandler(logging.FileHandler("werkzeug.log")) 

    # 환경 변수 정의
    env = os.getenv("FLASK_ENV", "default")
    app.config.from_object(config[env])

    jwt = JWTManager(app)

    # DATABASE 초기화 및 생성
    db.init_app(app)

    from api.models.audio import Audio
    from api.models.user import User
    from api.models.event import Event

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
    rInit_Graph()
    app.run(host="0.0.0.0", port=5000)