import { NestFactory } from "@nestjs/core";
import { UserModule } from "./module/user.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";
import winstonLogger from "@app/common/logger/nest.winston.logger";
import { MicroServiceLoggingInterceptor } from "@app/common/interceptor/micro.service.logging.interceptor";
import { SERVER_INFO_CONFIG } from "@config/config.interface";

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
        host: SERVER_INFO_CONFIG.user.host,
        port: SERVER_INFO_CONFIG.user.port,
      },
    }
  );
  app.useGlobalInterceptors(
    new MicroServiceLoggingInterceptor(app.get(Logger))
  );
  await app.listen();
}
bootstrap();
