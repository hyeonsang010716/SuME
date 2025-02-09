from datetime import datetime
from typing import Tuple
import os


def save_audio(file) -> Tuple[str, str]:
    UPLOAD_PATH = 'uploads'
    os.makedirs(UPLOAD_PATH, exist_ok=True)

    filename = "audio_{}.wav".format(datetime.now().strftime("%Y%m%d_%H%M%S"))
    file_path = UPLOAD_PATH+"/"+filename
    file.save(file_path)

    return filename, file_path

def delete_audio(file_path: str):
    if os.path.exists(file_path):
        os.remove(file_path)