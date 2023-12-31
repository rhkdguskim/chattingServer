import { NestFactory } from "@nestjs/core";
import { ChatModule } from "./module/chat.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import winstonLogger from "@lib/common/logger/nest.winston.logger";
import {LOG_CONFIG, SERVER_INFO_CONFIG} from "@config/config.interface";
import { MicroServiceLoggingInterceptor } from "@lib/common/interceptor/micro.service.logging.interceptor";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ChatModule,
    {
      logger: winstonLogger({
        filepath: LOG_CONFIG.filepath,
        loglevel: LOG_CONFIG.loglevel,
        name: LOG_CONFIG.name,
      }),
      transport: Transport.TCP,
      options: {
        host: SERVER_INFO_CONFIG.chat.host,
        port: SERVER_INFO_CONFIG.chat.port,
      },
    }
  );
  app.useGlobalInterceptors(
    new MicroServiceLoggingInterceptor(app.get(Logger))
  );
  await app.listen();
}
bootstrap();
