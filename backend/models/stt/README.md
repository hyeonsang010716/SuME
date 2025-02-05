### 클라우드 설정
1. 구글 클라우드 프로젝트 생성
2. 구글 클라우드 서비스 계정 키 json형식 생성
3. 구글 클라우드 stt api 사용 설정
4. 구글 클라우드 storage 버킷 생성 

### 환경설졍
1. sudo apt update / sudo apt install ffmpeg 설치
2. pip install -r requirement.txt
3. .env파일 생성 후 내용으로 GOOGLE_APPLICATION_CREDENTIALS="키 경로"
4. mgBucketName 설정한 버킷 이름 할당

### 주의사항
1. 스테레오가 아닌 모노채널인 음성파일만 가능
2. 음성파일의 종류(FLAC, WAV추천), 샘플링 레이트에 따라 rInit_GoogleCloudeSTT의 mgConfig부분 변경(참고: https://cloud.google.com/speech-to-text/docs/speech-to-text-requests?hl=ko)

### 참고(구글 클라우드 STT)
https://cloud.google.com/speech-to-text/docs/how-to?hl=ko