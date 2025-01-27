from flask import Blueprint, current_app
import requests, os

from db_models.audio import Audio

from flask import Blueprint

bp = Blueprint('main', __name__)

UPLOAD_PATH = 'upload'
os.makedirs(UPLOAD_PATH, exist_ok=True)


@bp.route("/")
def hello():
    return f"Hello World!"

@bp.route("/audio", methods=['POST'])
def get_audio():
    file_path = requests.json.get("file_path")
    audio = Audio.create(file_path)
    return {"id": audio.id, "file_path": audio.file_path}, 201

@bp.route("/audio/<int:audio_id>", methods=['GET'])
def send_audio(audio_id):
    audio = Audio.get(audio_id)
    if audio:
        return {"id": audio.id, "file_path": audio.file_path}, 200
    return {"message": "Audio not found"}, 404