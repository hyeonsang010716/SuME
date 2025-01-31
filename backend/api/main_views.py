from flask import Blueprint, request, jsonify
import logging
import os

from api.models import Audio
from models.stt.google_cloude import rCall_RunSTT


bp = Blueprint('main', __name__)

# 로거 설정
bp.logger = logging.getLogger('audio')  # 블루프린트에 로거 추가
bp.logger.setLevel(logging.INFO)  # 로그 레벨 설정

UPLOAD_PATH = 'uploads'
os.makedirs(UPLOAD_PATH, exist_ok=True)
filename = "test.wav"
file_path = "uploads/"+filename


@bp.route("/audio", methods=['POST'])
def upload_audio():
    file = request.files['audio']
    file.save(file_path)
    Audio.create(filename, file_path)

    return jsonify({"message": "File uploaded successfully", "file_path": file_path}), 200


@bp.route("/audio", methods=['GET'])
def send_audio():
    txt = rCall_RunSTT(filename, file_path)
    return {"message": txt, "status": "test"}, 200
