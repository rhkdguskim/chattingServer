import { NestFactory } from "@nestjs/core";
import { FriendModule } from "./module/friend.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { utilities, WinstonModule } from "nest-winston";
import { FRIEND_HOST, FRIEND_PORT, LOGLEVEL } from "@app/common/config";
import * as winston from "winston";
import { LoggingInterceptor } from "@app/common/interceptor";
import { Logger } from "@nestjs/common";
import { FRIEND_SERVICE } from "@app/common/message/friend";
import winstonLogger from "@app/common/logger/nestwinstonlogger";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FriendModule,
    {
      logger: winstonLogger({
          filepath: "Friend MicroService", loglevel: "debug", name: "Friend MicroService"
      }),
      transport: Transport.TCP,
      options: {
        host: FRIEND_HOST,
        port: FRIEND_PORT,
      },
    }
  );
  app.useGlobalInterceptors(new LoggingInterceptor(app.get(Logger)));
  await app.listen();
}
bootstrap();
