!유저 생성 이후 진행

### Evenv 생성

```curl -X POST "http://localhost:5000/calendar/events" \
 -H "Content-Type: application/json" \
-d '{"title": "222", "start": "2025-02-01", "end": "2025-02-20", "description": "2오늘의 일정입니다.", "user_id": 1}' \
-v
```

### Event 전부 확인

```
curl -G "http://localhost:5000/calendar/events" \
    --data-urlencode "user_id=1" \
    --data-urlencode "start=2024-02-01" \
    --data-urlencode "end=2026-02-20" \
    -v
```

### Event 삭제

```
curl -X DELETE "http://localhost:5000/calendar/events/1" \
-H "Content-Type: application/json" \
-v
```
