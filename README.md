# SuME (Summary Meeting)

오디오 회의를 **STT**(Speech to Text) 기술로 텍스트로 변환하고, **LLM**(Large Language Model)으로 핵심 내용을 자동 정리해주는 프로젝트입니다.

하지만 우리의 프로젝트는 단순 회의 정리에서 더 나아가, 정리된 회의 정보를 기반으로 **회의 일정**까지 자동 관리해주는 솔루션을 제공합니다.

---

## 📌 목차
1. [프로젝트 개요](#프로젝트-개요)  
2. [주요 기능](#주요-기능)  
3. [기술 스택](#기술-스택)  
4. [설치 및 실행](#설치-및-실행)  
5. [사용 방법](#사용-방법)  
6. [프로젝트 구조](#프로젝트-구조)  
7. [데모 및 배포](#데모-및-배포)  

---

## 🚀 프로젝트 개요
**SuME**(Summary Meeting)는 온라인/오프라인 회의 데이터를 음성 인식(STT) 기술로 텍스트로 변환하고, 이를 **LLM**으로 요약하여 자동 회의록을 생성하는 프로젝트입니다.
회의록에 그치지 않고, 요약된 회의 내용을 분석해 **자동으로 회의 일정을 캘린더에 등록**해주는 기능까지 제공합니다.

🔹 **프로젝트 명**: SuME (Summary Meeting)  
🔹 **목표**: 회의 음성 ▶ 텍스트 변환 ▶ LLM 요약 ▶ 일정 자동 관리  
🔹 **핵심 가치**: 빠르고 정확한 회의 정보 공유, 자동화된 일정 관리, 생산성 향상  

---

## ✨ 주요 기능
### 🎙️ 오디오-텍스트 변환 (STT)
- 회의 음성을 텍스트로 변환하여 회의 내용을 더 쉽게 관리할 수 있습니다.

### 📝 LLM 기반 회의 요약
- 텍스트로 변환된 회의록을 LLM으로 분석하여 핵심 내용만 빠르게 파악할 수 있습니다.

### 📅 자동 일정 관리
- 요약된 회의 내용을 바탕으로 LLM이 다음과 같은 정보를 자동 생성합니다:

```json
{
  "title": "주제",
  "description": "주제 상세 설명",
  "start_date": "시작 날짜",
  "end_date": "종료 날짜"
}
```
- 생성된 일정 정보를 프론트엔드 캘린더에 자동 반영합니다.

### 🔐 개인화된 로그인 기능
- 자체 로그인 기능을 통해 사용자별 회의 및 일정 정보를 별도로 관리할 수 있습니다.

---

## 🛠️ 기술 스택
| 구분          | 기술 스택 |
|--------------|------------------------------------------|
| **프론트엔드** | [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [React Router](https://reactrouter.com/) |
| **백엔드** | [Flask](https://flask.palletsprojects.com/), [SQLite](https://www.sqlite.org/index.html) |
| **서버** | [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/), [NGINX](https://nginx.org/en/), [Azure](https://azure.microsoft.com/) |
| **AI** | [Gemini](https://ai.google.dev/gemini-api/docs/gemini-1.5-pro), [Google Cloud Speech-to-Text](https://cloud.google.com/speech-to-text), [langchain](https://www.langchain.com/), [langgraph](https://www.langchain.com/langgraph) |

---

## ⚡ 설치 및 실행
프로젝트 루트 디렉토리에서 아래 명령어를 실행하면, **개발/테스트 환경**이 바로 실행됩니다.

```bash
docker-compose -f ./docker-compose.yml up -d
```

- `docker-compose up -d` : 백엔드(Flask), 프론트엔드(React), DB 등이 컨테이너로 동시에 실행됩니다.

---

## 🎯 사용 방법
1. **프로젝트 실행**  
   - 위 명령어로 컨테이너를 띄운 뒤, 브라우저에서 `http://localhost:3000` 또는 설정된 도메인/포트로 접속합니다.  
   - 클라우드 배포 주소: **[https://www.sume-ai.kro.kr](https://www.sume-ai.kro.kr)**

2. **로그인**  
   - 회원가입 또는 로그인하여 **개인화된 SuME** 환경에 진입합니다.

3. **오디오 업로드 & STT**  
   - 새 회의를 생성하면서 음성 파일을 업로드합니다.  
   - 업로드가 완료되면 서버에서 자동으로 STT가 진행됩니다.

4. **LLM 요약 결과 확인**  
   - 텍스트로 변환된 회의록을 바탕으로 LLM이 자동 요약합니다.  
   - 요약 결과를 메인 화면에서 확인할 수 있습니다.

5. **자동 일정 등록**  
   - LLM이 생성한 일정(JSON 형식)을 통해 회의 일정이 자동으로 캘린더에 반영됩니다.  

---

## 📂 프로젝트 구조
프론트엔드와 백엔드 각각의 `README.md` 파일을 참고하세요.

---

## 🌍 데모 및 배포
- **데모 사이트**: [https://www.sume-ai.kro.kr](https://www.sume-ai.kro.kr)  

---

## 🤝 기여 방법
- **이슈 등록**: 버그, 기능 개선 아이디어 등은 Issue로 등록해주세요.  
- **풀 리퀘스트(PR)**: 기능 구현 후 PR을 보내주시면 팀에서 리뷰 후 반영하겠습니다.

---

<p align="center">
  <b>💡 SuME와 함께 스마트한 회의 관리를 경험하세요! 💡</b>
</p>