1. 회원가입 테스트

``` cmd
curl -X POST http://localhost:5000/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name": "John Doe", "email": "john@example.com", "password": "mypassword"}'
```
- 성공 시
     ```{
  "message": "Registration successful."
}```

2. 로그인 테스트
``` cmd
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
curl -X GET http://127.0.0.1:5000/profile      -H "Authorization: Bearer <JWT 토큰 입력>"
```