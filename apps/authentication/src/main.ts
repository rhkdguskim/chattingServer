import { NestFactory } from '@nestjs/core';
import { AuthenticationModule } from './authentication.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {LoggingInterceptor} from "@src/common/interceptors/logging.interceptor";
import {Logger} from "@nestjs/common";
import {utilities, WinstonModule} from "nest-winston";
import * as winston from "winston";
import {AUTHENTICATION_SERVICE} from "@app/common/constant";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthenticationModule,{
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
              utilities.format.nestLike(AUTHENTICATION_SERVICE)
          ),
        }),
      ],
    }),
    transport : Transport.TCP,
    options : {
      port : 3001,
    }
  });
  app.useGlobalInterceptors(new LoggingInterceptor(app.get(Logger)));
  await app.listen();
}
bootstrap();
