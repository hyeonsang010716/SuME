회원가입 테스트


``` cmd
curl -X POST http://localhost:5000/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name": "John Doe", "email": "john@example.com", "password": "mypassword"}'
```