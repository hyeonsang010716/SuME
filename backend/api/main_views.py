from flask import Blueprint, request, jsonify
import logging
import os

from db_models.audio import Audio

from flask import Blueprint

bp = Blueprint('main', __name__)

# 로거 설정
bp.logger = logging.getLogger('audio')  # 블루프린트에 로거 추가
bp.logger.setLevel(logging.INFO)  # 로그 레벨 설정

UPLOAD_PATH = 'uploads'
os.makedirs(UPLOAD_PATH, exist_ok=True)


@bp.route("/audio", methods=['POST'])
def upload_audio():
    file = request.files['audio']
    filename = "test.mp3"
    file_path = os.path.join(UPLOAD_PATH, filename)
    
    file.save(file_path)
    
    return jsonify({"message": "File uploaded successfully", "file_path": file_path}), 200


@bp.route("/audio", methods=['GET'])
def send_audio():
    return {"message": "test"}, 200