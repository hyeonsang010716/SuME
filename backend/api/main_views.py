from flask import Blueprint, request, Response, jsonify
import logging
import json
import os

from api.models import Audio
from api.utils import save_audio, delete_audio
from models.stt.google_cloude import rCall_RunSTT


bp = Blueprint('main', __name__)

# 로거 설정
bp.logger = logging.getLogger('audio')  # 블루프린트에 로거 추가
bp.logger.setLevel(logging.INFO)  # 로그 레벨 설정

@bp.route("/audio", methods=['POST'])
def upload_audio():
    try:
        filename, file_path = save_audio(request.files['audio'])
        Audio.create(filename, file_path)
        return jsonify({"message": "File uploaded successfully", 'filename': filename, "file_path": file_path}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@bp.route("/audio", methods=['GET'])
def send_audio():
    try:
        filename = request.args.get('filename')
        file_path = request.args.get('file_path')
        txt = rCall_RunSTT(filename, file_path)
        delete_audio(file_path)
        return jsonify({"message": txt}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# @bp.route('/csrf_token', methods=['GET'])
# def get_csrf_token():
#     token = generate_csrf()
#     return jsonify({'csrf_token':  token})