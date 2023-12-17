import { NestFactory } from "@nestjs/core";
import { FriendModule } from "./module/friend.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { FRIEND_HOST, FRIEND_PORT } from "@app/common/config";
import { LoggingInterceptor } from "@app/common/interceptor";
import { Logger } from "@nestjs/common";
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
