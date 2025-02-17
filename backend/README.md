# API 개요

## 1. 프로젝트 소개
이 프로젝트는 **음성 업로드 및 일정 관리 시스템**을 제공하는 Flask 기반의 API입니다. 사용자는 오디오 파일을 업로드하여 텍스트 변환(STT) 서비스를 이용할 수 있으며, 이를 기반으로 일정을 자동으로 생성할 수 있습니다. JWT 기반의 인증을 사용하여 사용자 계정을 보호하며, 이벤트를 관리할 수 있습니다.

## 2. API의 주요 기능
- **사용자 인증**: 회원가입 및 로그인 기능 (JWT 사용)
- **음성 파일 업로드 및 변환**: 회의 음성을 업로드하고 요약 텍스트로 변환
- **일정 관리**: 일정 생성, 조회, 삭제 기능 제공

## 3. 사용해야 하는 인증 방식
- **JWT (JSON Web Token)**
  - 로그인 시 `access_token`을 발급받아 API 요청 시 `Authorization` 헤더에 포함하여 사용
  - 예시: `Authorization: Bearer <access_token>`

---

# 설정 및 인증

## 1. API 사용을 위해 필요한 환경 변수
- `JWT_SECRET_KEY` (JWT 토큰 생성 및 검증을 위한 키)
- `SQLALCHEMY_DATABASE_URI` (데이터베이스 연결 설정)
- `FLASK_ENV` (개발/운영 환경 구분)

### 환경 변수 예시 (`config.py`)
```python
class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///dev.db"
    JWT_SECRET_KEY = "dev_secret_key"
    DEBUG = True
```

## 2. API 요청 시 인증 방식
- **JWT Bearer Token** 사용 (`Authorization: Bearer <토큰>`)

---

# 엔드포인트 설명

## 1. 사용자 인증 관련 엔드포인트

### 🔹 회원가입
- **URI**: `/auth/register`
- **메서드**: `POST`
- **설명**: 새로운 사용자를 등록합니다.
- **요청 예시**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **응답 예시**
  ```json
  {
    "message": "Registration successful."
  }
  ```

### 🔹 로그인
- **URI**: `/auth/login`
- **메서드**: `POST`
- **설명**: 사용자 인증 후 JWT 토큰을 발급받습니다.
- **요청 예시**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **응답 예시**
  ```json
  {
    "access_token": "your.jwt.token"
  }
  ```

---

## 2. 오디오 업로드 및 변환 엔드포인트

### 🔹 오디오 업로드
- **URI**: `/audio`
- **메서드**: `POST`
- **설명**: 사용자의 음성 파일을 업로드합니다.
- **요청 헤더**
  ```
  Authorization: Bearer <JWT_TOKEN>
  Content-Type: multipart/form-data
  ```
- **요청 예시** (파일 업로드)
  ```
  Form-data: { "audio": <파일> }
  ```
- **응답 예시**
  ```json
  {
    "message": "File uploaded successfully",
    "filename": "audio_20240215_123456.wav",
    "file_path": "uploads/audio_20240215_123456.wav"
  }
  ```

### 🔹 오디오 변환 및 STT 실행
- **URI**: `/audio`
- **메서드**: `GET`
- **설명**: 업로드된 오디오 파일을 변환하여 텍스트로 반환합니다.
- **요청 헤더**
  ```
  Authorization: Bearer <JWT_TOKEN>
  ```
- **요청 예시**
  ```
  GET /audio?user_id=1&filename=audio_20240215_123456.wav
  ```
- **응답 예시**
  ```json
  {
    "message": "텍스트 변환 결과"
  }
  ```

---

## 3. 일정 관리 관련 엔드포인트

### 🔹 일정 조회
- **URI**: `/calendar/events`
- **메서드**: `GET`
- **설명**: 특정 사용자와 기간에 해당하는 이벤트 목록을 조회합니다.
- **요청 예시**
  ```
  GET /calendar/events?user_id=1&start=2024-02-01&end=2024-02-28
  ```
- **응답 예시**
  ```json
  [
    {
      "id": 1,
      "title": "회의",
      "description": "팀 회의 진행",
      "start_time": "2024-02-15T10:00:00",
      "end_time": "2024-02-15T11:00:00"
    }
  ]
  ```

### 🔹 일정 추가
- **URI**: `/calendar/events`
- **메서드**: `POST`
- **설명**: 새로운 일정을 추가합니다.
- **요청 예시**
  ```json
  {
    "title": "회의",
    "description": "팀 회의 진행",
    "start": "2024-02-15T10:00:00",
    "end": "2024-02-15T11:00:00",
    "user_id": 1
  }
  ```
- **응답 예시**
  ```json
  {
    "message": "Event created",
    "id": 1
  }
  ```

### 🔹 일정 삭제
- **URI**: `/calendar/events/<event_id>`
- **메서드**: `DELETE`
- **설명**: 특정 일정을 삭제합니다.
- **요청 예시**
  ```
  DELETE /calendar/events/1
  ```
- **응답 예시**
  ```json
  {
    "message": "Event deleted"
  }
  ```

## 백엔드 실행
```
python app.py
```

## Backend Structure

```
|- api/
|  |- __init__.py                  
|  |- config.py.                # 기본 환경변수 설정
|  |- utils.py.                 # 여러 유틸적인 함수
|  |
|  |- views/
|  |  |- __init__.py            # Blueprint를 Flask에 등록 및 설정 초기화
|  |  |- main_views.py.         # Route 정의
|  |  |- calendar.py            # 일정 생성 삭제 관련 Router
|  |  |- auth.py                # login, register 관련 Router
|  |
|  |- models/                   # DATABASE Model 정의
|  |  |- __init__.py            
|  |  |- user.py                
|  |  |- audio.py  
|  |  |- event.py
|
|- models/                      # stt 등 AI 관련 코드
|  |- __init__.py
|
|- uploads/                  # 오디오 데이터 저장하는 dircetory
|- example/                     # unittest
|
|- app.py.                      # APP 주요 진입점
|

```