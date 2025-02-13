1. 회원가입 테스트

```cmd
curl -X POST http://localhost:5000/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name": "UH", "email": "test@example.com", "password": "testpassword"}'
```

- 성공 시
  `{
  "message": "Registration successful."
}`

2. 로그인 테스트

```cmd
curl -X POST http://localhost:5000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "john@example.com", "password": "mypassword"}'
```

- 성공 시

```
{
  "access_token": "<JWT 토큰>"
}
```

3. 프로필 체크 (로그인 테스트)

```
curl -X GET http://localhost:5000/auth/profile      -H "Authorization: Bearer YOUR_JWT_token"
```

4. audio 업로드 확인

```
curl -X POST http://localhost:5000/audio \
     -H "Authorization: Bearer YOUR_JWT_token" \
     -F "audio=@test.wav"
```

5. audio 요약 확인

```
curl -G "http://localhost:5000/audio" \
     --data-urlencode "filename=YOURT_FILENAME" \
     --data-urlencode "file_path=YOUR_FILE_PATH" \
     -H "Authorization: Bearer YOUR_JWT_token"
```
