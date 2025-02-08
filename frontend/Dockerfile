FROM node:20

WORKDIR /app

COPY package*.json ./

# 의존성 설치 (React 버전 충돌 방지 옵션 추가)
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]