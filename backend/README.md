## 백엔드 사용 방법

1. Redis 설치
   Linux:

```
sudo apt update
sudo apt install redis-server
```

macOS:

```
brew install redis
```

Windows:

```
Windows에서는 WSL(Windows Subsystem for Linux)을 사용합니다.
```

2. python 파일 실행

```
python app.py
```

## Backend Structure

```
|- api/
|  |- __init__.py                  
|  |- config.py.                # 기본 환경변수 설정
|  |- utils.py.                 # 여러 유틸적인 함수
|  |- views/
|  |  |- __init__.py            # Blueprint를 Flask에 등록 및 설정 초기화
|  |  |- main_views.py.         # Route 정의
|  |- models/                   # DATABASE Model 정의
|  |  |- __init__.py            
|  |  |- user.py                
|  |  |- audio.py  
|- models/                      # stt 등 AI 관련 코드
|  |- __init__.py
|
|- uploads/                  # 오디오 데이터 저장하는 dircetory
|
|  |- app.py.                      # APP 주요 진입점
|
|- example/                     # unittest

```
