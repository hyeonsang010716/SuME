from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import logging

from db import init_app, db

load_dotenv()


def create_app():
    app = Flask(__name__)
    
    CORS(app)
    logging.basicConfig(level=logging.DEBUG)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    init_app(app)

    from api.main_views import bp
    app.register_blueprint(bp)

    with app.app_context():
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)