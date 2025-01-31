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
|  |- __init__.py            # Blueprint를 Flask에 등록 및 설정 초기화
|  |- main_views.py.         # Route 정의
|- models/
|  |- __init__.py
|- db_models/
|  |- __init__.py            # This is an empty file that makes the models package importable as a module.
|  |- user.py                #
|  |- audio.py               #
|
|- app.py.                   # APP 주요 진입점
|- db.py.                    #  This file can contain code that sets up the database connection and applies migrations.
|
|- database/
|  |- user.db
|  |- audio.db
|
|- uploads/                  # 오디오 데이터 저장하는 dircetory
```
