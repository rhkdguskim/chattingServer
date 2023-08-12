import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/util/swagger';
import * as config from 'config'
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server')
  app.use(cookieParser())
  app.enableCors({
    origin: ['http://localhost:3001'],
    credentials: true,
  });
  setupSwagger(app);
  await app.listen(serverConfig.port);
}
bootstrap();
