import { NestFactory } from "@nestjs/core";
import { UserModule } from "./module/user.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { FRIEND_HOST, FRIEND_PORT } from "@app/common/config";
import { MicroServiceLoggingInterceptor } from "@app/common/interceptor";
import { Logger } from "@nestjs/common";
import winstonLogger from "@app/common/logger/nestwinstonlogger";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      logger: winstonLogger({
        filepath: "Friend MicroService",
        loglevel: "debug",
        name: "Friend MicroService",
      }),
      transport: Transport.TCP,
      options: {
        host: FRIEND_HOST,
        port: FRIEND_PORT,
      },
    }
  );
  app.useGlobalInterceptors(
    new MicroServiceLoggingInterceptor(app.get(Logger))
  );
  await app.listen();
}
bootstrap();
