import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "@src/app.module";
import { AuthenticationControllerHttp } from "../../authentication/src/controller/authentication.controller.http";

describe("OpenaiController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationControllerHttp], // 테스트할 컨트롤러를 포함시킵니다.
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it("/auth (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/auth")
      .expect(404);

    // 여기서 response.body를 분석하여 기대 결과와 비교할 수 있습니다.
    // 예를 들어, response.body의 내용이 기대하는 형식인지 확인할 수 있습니다.
    // 이 부분은 테스트 목적에 맞게 수정해야 합니다.
  });
});
