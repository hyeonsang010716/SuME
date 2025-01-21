### 환경설정
1. pip install google-cloud-speech
2. pip install google-cloud-storage

### 클라우드 설정정
1. google cloud api 키를 json형식으로 생성
2. example.py에 os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "path"에서 path 부분 생성한 json형식의 키 경로 넣기
3. google cloud의 같은 프로젝트 안에 gcs버킷 생성 후 bucket_name에 생성한 버킷 이름 할당
4. 업로드할 source file 경로 source_file_path에 할당(파일에 맞게 config 내용 수정)
5. bucket에 업로드 될 source file의 이름 destination_blob_name에 할당