# 🚀 Chatting Server

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white" />
</p>

## 📝 프로젝트 개요
> **나만의 채팅**, **1:1 채팅**, **그룹 실시간 채팅** 기능을 제공하는 고성능 백엔드 서버입니다.  
> 사용자 프로필(상대 메시지, 배경, 프로필 화면) 커스터마이징과 친구 기능을 통한 실시간 상태 공유를 지원합니다.

- **📅 프로젝트 기간**: 2023. 06 ~ 2024. 01
- **👤 담당자**: 김광현 ([@rhkdguskim](https://github.com/rhkdguskim))
- **🏗️ 아키텍처**: Monorepo 기반 Microservices Architecture (MSA) 지향

---

## 🛠️ 기술 스택 및 환경 구성

### Core
- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Communication**: WebSocket (Socket.io), gRPC (Internal)

### Data & Storage
- **Database**: MySQL / MariaDB (TypeORM)
- **Caching**: Redis (Performance Optimization & Caching Interceptor)

### DevOps & Tools
- **Deployment**: Docker, CloudType
- **CI/CD**: GitHub Actions
- **API Documentation**: Swagger (OpenAPI)
- **Repository**: Mono-repo structure

---

## ✨ 핵심 기능

### 📺 서비스 시연
<p align="center">
  <img width="48%" alt="Demo 1" src="https://github.com/rhkdguskim/chattingServer/assets/111857144/50e7023d-f671-463b-a172-058eaca0fc52">
  <img width="48%" alt="Demo 2" src="https://github.com/rhkdguskim/chattingServer/assets/111857144/52d520df-44df-4d1d-bd9d-ffc2b63fd424">
</p>

### 🔍 마이크로서비스 상세
- 🔐 [**Auth Service**](apps/auth/README.md): 인증 및 인가 (JWT, Passport)
- 👤 [**User Service**](apps/user/README.md): 유저 관리, 프로필 커스터마이징, 친구 시스템
- 💬 [**Chat Service**](apps/chat/README.md): 실시간 채팅, 채팅방 관리, 참가자 제어

---

## 🚀 시작하기

### 설치
```bash
$ npm install
```

### 실행
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### 테스트
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

