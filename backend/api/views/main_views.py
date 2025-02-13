from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
import logging

from api.models.audio import Audio
from api.utils import save_audio, delete_audio
from models.stt.google_cloude import rCall_RunSTT


bp = Blueprint('main', __name__)

# 로거 설정
bp.logger = logging.getLogger('main')  # 블루프린트에 로거 추가
bp.logger.setLevel(logging.DEBUG)  # 로그 레벨 설정

# 콘솔 출력 핸들러 추가
if not bp.logger.handlers:
    handler = logging.StreamHandler()
    handler.setFormatter(logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s"))
    bp.logger.addHandler(handler)

bp.logger.info("Main Blueprint Logger Initialized")


@bp.route("/audio", methods=['POST'])
@jwt_required()
def upload_audio():
    try:
        bp.logger.info('Start upload audio')
        audio_file = request.files['audio']
        if not audio_file:
            raise ValueError("No audio file provided.")
        
        bp.logger.info('Upload file')
        filename, file_path = save_audio(audio_file)
        Audio.create(filename, file_path)
        bp.logger.info('Add Audio')
        return jsonify({"message": "File uploaded successfully", 'filename': filename, "file_path": file_path}), 200
    except ValueError as ve:
        bp.logger.error(f'ValueError: {str(ve)}')
        return jsonify({'message': str(ve)}), 400
    except Exception as e:
        bp.logger.error(f'Unexpected error: {str(e)}')
        return jsonify({f'message': 'An unexpected error occurred.{str(e)}'}), 500


@bp.route("/audio", methods=['GET'])
@jwt_required()
def send_audio():
    try:
        filename = request.args.get('filename')
        file_path = 'uploads/' + filename
        bp.logger.info(f'request data: file_path: {file_path}')
        txt = rCall_RunSTT(filename, file_path)
        delete_audio(file_path)
        
        return jsonify({"message": txt}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400
