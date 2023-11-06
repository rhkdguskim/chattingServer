### Archtechture
```mermaid
flowchart TD
    A2[Frontend] --> A
    A --> A2
    A[API GateWay] --> B(Authenication Service)
    A --> C(Authorizaion Service)
    C --> A
    A --> D(Chat Service)
    D --> A
    A --> E(Friend Service)
    E --> A
    A --> F(Room Service)
    F --> A
    A --> G(File Service)
    G --> A
```

### AuthGuard Sequence Diagram ( JWT Token )
``` mermaid
sequenceDiagram;
    FrontEnd ->> APIGateWay : Plz Check Verify
    APIGateWay ->> AuthorizaionMicroService : Send to Authorizaion
    AuthorizaionMicroService ->> APIGateWay : Verifyed
    APIGateWay ->> FrontEnd : Verifyed
```

### Oauth 2.0 Sequence Diagram
``` mermaid
sequenceDiagram;
    FrontEnd ->> OauthProiver: Get Code from Redirect
    OauthProiver ->> FrontEnd : Okay Here is Code by Redirect
    FrontEnd ->> APIGateWay : Plz Check Verify ( Code )
    APIGateWay ->> AuthorizaionMicroService : Send to Authorizaion ( Code )
    AuthorizaionMicroService ->> OauthProiver : Checking Verify...
    OauthProiver ->> AuthorizaionMicroService : Vertifyed
    AuthorizaionMicroService ->> APIGateWay : Verifyed
    APIGateWay ->> FrontEnd : Verifyed
```

## Description
- 실시간 채팅 기능을 제공합니다.
- 프로필, 친구 기능을 제공합니다.


## TechSpec
- [x] OAuth 2.0
- [x] AuthGuard by JWT Token
- [x] Websocket Realtime Chatting
- [x] Redis Caching System
- [x] TypeORM ( MySQL )
- [x] Swagger API
- [x] CI/CD PipeLine ( Deploy, Test )

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

## Swagger API
- [https://port-0-kakaotalk-apigateway-eu1k2lllawv5vy.sel3.cloudtype.app/api](https://port-0-kakaotalk-backend-eu1k2lllawv5vy.sel3.cloudtype.app/api)

## Open Server
- 아래의 링크에서 서비스를 확인 할 수 있습니다.
- https://web-kakaotalk-frontend-eu1k2lllawv5vy.sel3.cloudtype.app/
