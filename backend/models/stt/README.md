### 환경설정
1. pip install -r requirement.txt
2. .env파일 생성 후 내용으로 GOOGLE_APPLICATION_CREDENTIALS="키 경로" 작성

### 클라우드 설정
1. google cloud 서비스 계정 키를 json형식으로 생성
3. google cloud의 같은 프로젝트 안에 gcs버킷 생성 후 bucket_name에 생성한 버킷 이름으로 변경
4. 업로드할 source file 경로 source_file_path에 할당 (음성성파일에 맞게 transcribe_audio_file함수 안 config 수정)
5. bucket에 업로드 될 source file의 이름 destination_blob_name에 할당

### 주의사항
1. 스테레오가 아닌 모노채널인 음성파일만 가능
2. 음성파일의 종류(FLAC, WAV추천), 샘플링 레이트에 따라 transcribe_audio_file의 config부분 변경(참고: https://cloud.google.com/speech-to-text/docs/speech-to-text-requests?hl=ko)

### 참고(구글 클라우드 STT)
https://cloud.google.com/speech-to-text/docs/how-to?hl=ko