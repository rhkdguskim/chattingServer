import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@src/app.module';
import { OpenaiModule } from '@src/openai/openai.module';
import { OpenaiController } from '@src/openai/openai.controller';
import { OpenaiService } from '@src/openai/openai.service';
import { AuthController } from '@src/auth/auth.controller';

describe('OpenaiController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController], // 테스트할 컨트롤러를 포함시킵니다.
      providers: [OpenaiService], // 테스트할 컨트롤러가 사용하는 서비스를 포함시킵니다.
    }).compile();
    

    app = moduleFixture.createNestApplication();
    
    await app.init();
  });

  it('/auth (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/auth').expect(404);
    
    // 여기서 response.body를 분석하여 기대 결과와 비교할 수 있습니다.
    // 예를 들어, response.body의 내용이 기대하는 형식인지 확인할 수 있습니다.
    // 이 부분은 테스트 목적에 맞게 수정해야 합니다.
  });
});