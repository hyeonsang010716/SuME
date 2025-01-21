### 환경설정
1. google cloud api 키를 json형식으로 생성
2. pip install google-cloud-speech
3. pip install google-cloud-storage
4. example.py에 os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "path"에서 path 부분 생성한 json형식의 키 경로 넣기
5. 구글 클라우드 같은 프로젝트 안에 gcs버킷 생성 후후