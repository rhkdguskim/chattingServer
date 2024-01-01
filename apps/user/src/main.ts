import { NestFactory } from "@nestjs/core";
import { UserModule } from "./module/user.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";
import winstonLogger from "@lib/common/logger/nest.winston.logger";
import { MicroServiceLoggingInterceptor } from "@lib/common/interceptor/micro.service.logging.interceptor";
import { LOG_CONFIG, SERVER_INFO_CONFIG } from "@config/config.interface";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      logger: winstonLogger({
        filepath: LOG_CONFIG.name,
        loglevel: LOG_CONFIG.loglevel,
        name: LOG_CONFIG.filepath,
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
