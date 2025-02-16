FROM node:22

WORKDIR /app

COPY package*.json ./

# 의존성 설치 (보다 안정적인 방법 사용)
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
