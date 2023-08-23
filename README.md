## Description
- 프로필, 친구 기능을 제공합니다.
- 실시간 채팅 기능을 제공합니다.

## TechSpec
- JWT Token으로 Guard Strategy를 적용하였습니다.
- WebSocket을 사용한 실시간 채팅을 보장합니다.
- 캐싱 시스템을 적용하여 DB 조회를 최소화 하였습니다. ( Redis 저장소 사용 )
- TypeORM을 사용하여 Object와 Entity 간의 관계를 명확하게 정의 하였습니다.
- Swagger를 사용하여 API를 명세하여 서버가 요구하는 Request, Response를 정확하게 파악 할 수 있습니다.

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

## Open Server
- 아래의 링크에서 서비스를 확인 할 수 있습니다.
- https://web-kakaotalk-frontend-eu1k2lllawv5vy.sel3.cloudtype.app/login