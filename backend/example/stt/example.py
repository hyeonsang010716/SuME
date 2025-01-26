import os
from google.cloud import speech
from google.cloud import storage
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

def upload_blob(bucket_name, source_file_path, file_name):
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(file_name)
    
    # 파일이 이미 존재하는지 확인하고, 존재하면 함수 종료
    if blob.exists():
        print(f"File {file_name}가 이미 존재합니다.")
        return

    blob.upload_from_filename(source_file_path)
    print(f"{source_file_path}의 파일이 {bucket_name}에 {file_name}으로 업로드되었습니다.")

def transcribe_audio_file(gcs_uri: str) -> str:
    
    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(uri=gcs_uri) # gcs에서 파일읽기
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,  # .wav파일
        sample_rate_hertz=48000, # 샘플 레이트 48kHz(해당 파일의 샘플 레이트트)
        language_code="ko-KR",  # 영어와 한글글설정
    )

    operation = client.long_running_recognize(config=config, audio=audio)

    print("Waiting for operation to complete...")
    response = operation.result(timeout=900)

    transcript_builder = []
    for result in response.results:
        transcript_builder.append(f"{result.alternatives[0].transcript}\n")

    transcript = "".join(transcript_builder)

    return transcript

def delete_blob(bucket_name, file_name):
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(file_name)
    
    # 파일이 버킷에 이미 존재하는지 확인하고, 존재하지 않으면 함수 종료
    if not blob.exists():
        print(f"File {file_name}이 존재하지 않습니다.")
        return

    blob.delete()
    print(f"File {file_name}가 삭제됨.")

def process_all(file_name):
    # 버킷 이름, 음성파일 경로 설정
    bucket_name = "sume_audio_bucket"
    source_file_path = "./example/stt/example_audio_file/Trip (Feat. Hannah).wav"
    
    # 버킷에 음성파일 업로드
    upload_blob(bucket_name, source_file_path, file_name)
    
    # GCS URI 생성 후 택스트로 변환
    gcs_uri = f"gs://{bucket_name}/{file_name}"
    result_text = transcribe_audio_file(gcs_uri)
    
    # 버킷에 음성파일 삭제
    delete_blob(bucket_name, file_name)
    
    return result_text
    

if __name__=="__main__":
    # GCS에 업로드할 파일 이름 설정
    file_name = "Trip (Feat. Hannah).wav"

    result_text = process_all(file_name)
    print(result_text)