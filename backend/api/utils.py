from pydub import AudioSegment
import os


def change_to_type(file):
    # 임시 파일로 저장
    temp_name = "temp_.wav"
    temp_path = "uploads/"+temp_name
    file.save(temp_path)
    
    audio = AudioSegment.from_file(temp_path)
    
    if audio.channels > 1:
        audio = audio.set_channels(1)
    
    os.remove(temp_path)
    return audio