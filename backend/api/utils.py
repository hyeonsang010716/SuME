from datetime import datetime
from typing import Tuple
import logging
import os

logger = logging.getLogger("utils")
logger.setLevel(logging.DEBUG)

file_handler = logging.FileHandler("utils.log")
file_handler.setFormatter(logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s"))
logger.addHandler(file_handler)


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


