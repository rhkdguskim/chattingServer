import { NestFactory } from '@nestjs/core';
import { AuthorizationServiceModule } from './authorization-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthorizationServiceModule);
  await app.listen(3000);
}
bootstrap();
