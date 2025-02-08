from flask import Blueprint, request, jsonify
import logging

from api.models.audio import Audio
from api.utils import save_audio, delete_audio
from models.stt.google_cloude import rCall_RunSTT


bp = Blueprint('main', __name__)

# 로거 설정
bp.logger = logging.getLogger('audio')  # 블루프린트에 로거 추가
bp.logger.setLevel(logging.INFO)  # 로그 레벨 설정

@bp.route("/audio", methods=['POST'])
def upload_audio():
    try:
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
        return jsonify({'message': 'An unexpected error occurred.'}), 500


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
