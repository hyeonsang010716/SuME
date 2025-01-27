## 프론트트엔드 사용 방법

1. React 실행

```
npm start
```

## Frontend Structure

```
│- API.js                                # API 통합 관리
│- App.css
│- App.js
│- data.json
│- index.css
│- index.js
│
└─pages
    │- Header.jsx                        # Header 겸 Sidebar Component
    │- Title.jsx                         # Title Component
    │
    ├─homepage
    │      |- Homepage.jsx               # 메인 홈페이지 Component (사용 예정)
    │
    ├─login
    │      |- login.jsx                  # Login Component (사용 예정)
    │
    └─mainpage
            |- Mainpage.jsx              # 요약 메인 페이지
            |- RecordedAudio.jsx         # Audio 재생 Component
            |- RecordingButton.jsx       # Recording Button Component
            |- SumLayout.jsx             # 요약 창 Component
            |- TextInputForm.jsx         # text post Component (미사용용)
            |- TimerDisplay.jsx          # 타이머 Component
```
