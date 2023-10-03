import { NestFactory } from '@nestjs/core';
import { AuthorizationModule } from './authorization.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {LoggingInterceptor} from "@app/common/interceptor";
import {Logger} from "@nestjs/common";
import {utilities, WinstonModule} from "nest-winston";
import * as winston from "winston";
import { AUTHORIZATION_SERVICE} from "@app/common/message/authorization";
import {AUTHORIZAION_HOST, AUTHORIZAION_PORT, LOGLEVEL} from "@app/common/config";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthorizationModule, {
    logger: WinstonModule.createLogger({
      level : LOGLEVEL,
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
      host : AUTHORIZAION_HOST,
      port : AUTHORIZAION_PORT,
    }
  })
  app.useGlobalInterceptors(new LoggingInterceptor(app.get(Logger)));
  await app.listen();
}
bootstrap();
