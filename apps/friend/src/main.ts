import { NestFactory } from '@nestjs/core';
import { FriendModule } from './friend.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {utilities, WinstonModule} from "nest-winston";
import {FRIEND_HOST, FRIEND_PORT, LOGLEVEL} from "@app/common/config";
import * as winston from "winston";
import {LoggingInterceptor} from "@app/common/interceptor";
import {Logger} from "@nestjs/common";
import {FRIEND_SERVICE} from "@app/common/message/friend";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(FriendModule, {
    logger: WinstonModule.createLogger({
      level : LOGLEVEL,
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
              utilities.format.nestLike(FRIEND_SERVICE)
          ),
        }),
      ],
    }),
    transport : Transport.TCP,
    options : {
      host : FRIEND_HOST,
      port : FRIEND_PORT,
    }
  })
  app.useGlobalInterceptors(new LoggingInterceptor(app.get(Logger)));
  await app.listen();
}
bootstrap();
