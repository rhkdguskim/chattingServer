import { NestFactory } from '@nestjs/core';
import { AuthenticationModule } from './authentication.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthenticationModule,{
    transport : Transport.TCP,
    options : {
      port : 3001,
    }
  });
  await app.listen();
}
bootstrap();
