from flask import Blueprint, request, flash, jsonify
from flask_wtf.csrf import generate_csrf
import logging

from api.models.audio import Audio
from api.utils import save_audio, delete_audio
from models.stt.google_cloude import rCall_RunSTT
from api.forms import AudioUploadForm


bp = Blueprint('main', __name__)

# 로거 설정
bp.logger = logging.getLogger('audio')  # 블루프린트에 로거 추가
bp.logger.setLevel(logging.INFO)  # 로그 레벨 설정

@bp.route("/audio", methods=['POST'])
def upload_audio():
    form = AudioUploadForm()
    if form.validate_on_submit():
        try:
            audio_file = form.audio.data
            filename, file_path = save_audio(audio_file)
            Audio.create(filename, file_path)
            return jsonify({"message": "File uploaded successfully", 'filename': filename, "file_path": file_path}), 200
        except Exception as e:
            return jsonify({'message': 'File uploaded failed'}), 404
    else:
        return jsonify({'message': 'Audio를 형식에 맞게 전송해주세요'})


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


@bp.route('/csrf_token', methods=['GET'])
def get_csrf_token():
    token = generate_csrf()
    return jsonify({'csrf_token':  token})