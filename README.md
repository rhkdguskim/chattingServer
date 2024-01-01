## 프로젝트 개요
> 나만의채팅, 1:1, 그룹 실시간 채팅 기능을 제공하며, 사용자 프로필을 통하여 상태메세지, 배경화면, 프로필화면을 꾸밀 수 있으며, 친구 기능을 통하여 자기자신의 상태메세지를 다른 친구에게 보여줄 수 있습니다.
- 프로젝트 이름 : Chatting Server
- 프로젝트 지속기간 : 2023. 06 ~ 2024. 01
- 프로젝트 담당자 : 김광현
  
## 환경구성
### 개발환경
- 플랫폼 : NodeJS
- 언어 : TypeScript
- IDE : VSCode, WebStrom
- CI/CD : CloudType, Git Action
- 저장소 : 모노레포 형식

### 핵심기술
- [x] Websocket Realtime Chatting
- [x] MySQL, Maria DB ( TypeORM )
- [x] Redis ( Caching Interceptor )
- [x] Swagger API
- [x] Docker Deployment
      
## 기능
### 시연 이미지
<img width="721" alt="image" src="https://github.com/rhkdguskim/chattingServer/assets/111857144/50e7023d-f671-463b-a172-058eaca0fc52">
<img width="738" alt="image" src="https://github.com/rhkdguskim/chattingServer/assets/111857144/52d520df-44df-4d1d-bd9d-ffc2b63fd424">

### 세부 사항
- [인증, 인가 서비스 기능](apps/auth/README.md)
- [유저, 친구 서비스 기능](apps/user/README.md)
- [채팅, 채팅방, 참가자 서비스 기능](apps/chat/README.md)

## Installation

```bash
$ npm install
```

## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
