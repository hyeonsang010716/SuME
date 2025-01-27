from flask import Blueprint, request, jsonify
import os

from db_models.audio import Audio

from flask import Blueprint

bp = Blueprint('main', __name__)

UPLOAD_PATH = 'upload'
os.makedirs(UPLOAD_PATH, exist_ok=True)


@bp.route("/")
def hello():
    return f"Hello World!"

@bp.route("/audio", methods=['POST'])
def upload_audio():
    if 'file' not in request.files:
        return jsonify({"message": "No file part"}), 400
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400
    
    filename = "test"
    file_path = os.path.join(UPLOAD_PATH, filename)
    
    file.save(file_path)
    
    return jsonify({"message": "File uploaded successfully", "file_path": file_path}), 201

@bp.route("/audio/<int:audio_id>", methods=['GET'])
def send_audio(audio_id):
    audio = Audio.get(audio_id)
    if audio:
        return {"id": audio.id, "file_path": audio.file_path}, 200
    return {"message": "Audio not found"}, 404