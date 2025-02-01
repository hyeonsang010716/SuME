from google.cloud import speech
from google.cloud import storage
from dotenv import load_dotenv

from etc.logger import rInit_Logger

mgStorageClient = None
mgSTTModel = None
mgConfig = None
mgBucketName = "sume_audio_bucket" # 구글 클라우드 버킷 지정
mgPrintLog = rInit_Logger(__file__,"DEBUG")

def rInit_GoogleCloudeSTT() -> None:
    """Google Cloude STT Model Init func"""
    global mgSTTModel, mgConfig, mgStorageClient
    
    load_dotenv()
    
    mgSTTModel = speech.SpeechClient()
    
    mgConfig = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        language_code="ko-KR",  
    )
    
    mgStorageClient = storage.Client()
    
    return None

def rCall_RunSTT(file_name: str, file_path: str) -> str:
    
    mCall_FormatWavFile(file_path)
    
    mCall_UploadBlob(mgBucketName, file_path, file_name)
    
    gcs_uri = f"gs://{mgBucketName}/{file_name}"
    result_text = mCall_TranscribeAudioFile(gcs_uri)
    
    mCall_DeleteBlob(mgBucketName, file_name)
    
    print("***********************" , result_text, "***********************")
    
    return result_text

from pydub import AudioSegment

def mCall_FormatWavFile(input_path : str) -> None:

    audio = AudioSegment.from_file(input_path)

    audio = audio.set_sample_width(2).set_frame_rate(16000).set_channels(1)

    audio.export(input_path, format="wav")

    return None


def mCall_UploadBlob(bucket_name:str, source_file_path:str, file_name:str) -> None:
    try:
        bucket = mgStorageClient.bucket(bucket_name)
        blob = bucket.blob(file_name)
        
        if blob.exists():
            mgPrintLog.info(f"File {file_name}가 이미 존재합니다.")
            return None

        blob.upload_from_filename(source_file_path)
        mgPrintLog.info(f"{source_file_path}의 파일이 {bucket_name}에 {file_name}으로 업로드되었습니다.")
        
        return None
        
    except Exception as e:
        mgPrintLog.error(f"{e}")
        raise e

def mCall_TranscribeAudioFile(gcs_uri: str) -> str:

    audio = speech.RecognitionAudio(uri=gcs_uri)

    operation = mgSTTModel.long_running_recognize(config=mgConfig, audio=audio)

    mgPrintLog.info("Waiting for operation to complete...")
    
    response = operation.result(timeout=900)

    transcript_builder = []
    for result in response.results:
        transcript_builder.append(f"{result.alternatives[0].transcript}\n")

    transcript = "".join(transcript_builder)

    return transcript

def mCall_DeleteBlob(bucket_name:str, file_name:str) -> None:
    
    bucket = mgStorageClient.bucket(bucket_name)
    blob = bucket.blob(file_name)
    
    if not blob.exists():
        mgPrintLog.info(f"File {file_name}이 존재하지 않습니다.")
        return None

    blob.delete()
    mgPrintLog.info(f"File {file_name}가 삭제됨.")
    
    return None


    

    

if __name__=="__main__":
    file_name = "Trip (Feat. Hannah).wav"  # 오디오 파일 이름
    file_path = "./models/stt/example_audio_file/Trip (Feat. Hannah).wav" #오디오 파일 경로로

    result_text = rCall_RunSTT(file_name, file_path)
    print(result_text)