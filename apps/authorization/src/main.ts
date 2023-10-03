import { NestFactory } from '@nestjs/core';
import { AuthorizationModule } from './authorization.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {LoggingInterceptor} from "@src/common/interceptors/logging.interceptor";
import {Logger} from "@nestjs/common";
import {utilities, WinstonModule} from "nest-winston";
import * as winston from "winston";
import { AUTHORIZATION_SERVICE} from "@app/common/constant";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthorizationModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
              utilities.format.nestLike(AUTHORIZATION_SERVICE)
          ),
        }),
      ],
    }),
    transport : Transport.TCP,
    options : {
      host : "127.0.0.1",
      port : 3002,
    }
  })
  app.useGlobalInterceptors(new LoggingInterceptor(app.get(Logger)));
  await app.listen();
}
bootstrap();
