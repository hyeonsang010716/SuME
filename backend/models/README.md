# 🚀 AI models

## 📌 개요

이 프로젝트는 여러 AI 모델과 프레임워크를 활용하여 **음성-텍스트 변환(STT)** 및 **텍스트 요약과 일정 생성** 기능을 제공합니다.

## 🔧 주요 기술
### 🎙️ 음성-텍스트 변환
- **Google Cloud Speech-to-Text V1**를 사용하여 음성을 텍스트로 변환합니다.

### 📝📅 텍스트 요약과 일정 생성
- **Gemini-1.5-Flash**를 활용하여 AI기반 텍스트 요약과 일정 생성을 수행합니다.
- **LangChain**을 사용하여 AI 워크플로우를 효율적으로 관리합니다.
- **LangGraph**를 이용하여 AI 프로세스를 최적화합니다.

## ⚙️ 사전 요구 사항

### 1️⃣ Google Cloud 설정  
1. Google Cloud에서 새 프로젝트 생성
2. Google Cloud Speech-to-Text API 사용 설정
3. 생성한 프로젝트의 서비스 계정 키(json 형식)와 gemini api 키 발급
4. 생성한 프로젝트에서 Google Storage bucket 생성
5. google_cloude.py에 mgbucketname에 생성한 버킷 이름 할당

자세한 내용은 [공식 문서](https://cloud.google.com/speech-to-text/docs?hl=ko)를 이용하세요.

### 2️⃣ 환경 변수 설정  
다음 환경 변수를 '.env' 파일에 설정해야 합니다.

```
GOOGLE_APPLICATION_CREDENTIALS=/path/to/your-service-account-key.json
GOOGLE_API_KEY=your-gemini-key
```

### 3️⃣ Python 버전
Python 3.8 이상(3.9 이상 권장)

### 4️⃣ 필수 패키지 설치
이 프로젝트의 패키지는 상위 디렉토리의 requirements.txt에서 관리됩니다. 설치하려면 아래 명령어를 실행하세요.

```
pip install -r ../requirements.txt
```

### 5️⃣ 가상 환경 사용 (권장)
📌 Windows
```
python -m venv venv
venv\Scripts\activate
```


📌 Mac/Linux
```
python -m venv venv
source venv/bin/activate
```