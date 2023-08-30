console.log(__dirname)
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "@src/app.module";
import { AuthModule } from "@src/auth/auth.module";
import { OpenaiModule } from "@src/openai/openai.module";


describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [OpenaiModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

});
