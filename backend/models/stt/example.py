import os
from google.cloud import speech
from google.cloud import storage

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "C:/Users/sentr/Downloads/sume-stt-7dc74e154409.json"

def upload_blob(bucket_name, source_file_path, destination_blob_name):
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    
    # 파일이 이미 존재하는지 확인하고, 존재하면 함수 종료
    if blob.exists():
        print(f"File {destination_blob_name}가 이미 존재합니다.")
        return

    blob.upload_from_filename(source_file_path)
    print(f"{source_file_path}의 파일이 {bucket_name}에 {destination_blob_name}으로 업로드되었습니다.")
    
def transcribe_audio_file(gcs_uri: str) -> str:
    
    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(uri=gcs_uri) # gcs에서 파일읽기
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,  # .wav파일
        sample_rate_hertz=48000, # 샘플 레이트 48kHz(해당 파일의 샘플 레이트트)
        language_code="ko-KR",  # 한글설정
    )

    operation = client.long_running_recognize(config=config, audio=audio)

    print("Waiting for operation to complete...")
    response = operation.result(timeout=900)

    transcript_builder = []
    for result in response.results:
        transcript_builder.append(f"{result.alternatives[0].transcript}\n")

    transcript = "".join(transcript_builder)

    return transcript

if __name__=="__main__":
    # GCS 버킷 이름, 로컬 파일 경로, GCS에 업로드할 파일 이름 설정
    bucket_name = "sume_audio_bucket"
    source_file_path = "C:/Users/sentr/Downloads/Trip (Feat. Hannah).wav"
    destination_blob_name = "Trip (Feat. Hannah).wav"

    # 파일 업로드
    upload_blob(bucket_name, source_file_path, destination_blob_name)

    # GCS URI 생성
    gcs_uri = f"gs://{bucket_name}/{destination_blob_name}"

    result_text = transcribe_audio_file(gcs_uri)
    print(result_text)