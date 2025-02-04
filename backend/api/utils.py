from datetime import datetime
from typing import Tuple
import os


def save_audio(file) -> Tuple[str, str]:
    UPLOAD_PATH = 'uploads'
    os.makedirs(UPLOAD_PATH, exist_ok=True)

    filename = f"audio_{datetime.now()}.wav"
    file_path = UPLOAD_PATH+"/"+filename
    file.save(file_path)

    return filename, file_path

def delete_audio(file_path: str):
    if os.path.exists(file_path):
        os.remove(file_path)