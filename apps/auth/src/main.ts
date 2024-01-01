import { NestFactory } from "@nestjs/core";
import { AuthenticationModule } from "./module/authentication.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";
import { RcpExceptionsFilter } from "@lib/common/exception/server.exception.filter";
import winstonLogger from "@lib/common/logger/nest.winston.logger";
import { MicroServiceLoggingInterceptor } from "@lib/common/interceptor/micro.service.logging.interceptor";
import { LOG_CONFIG, SERVER_INFO_CONFIG } from "@config/config.interface";

async function bootstrap() {
  const logger = winstonLogger({
    name: LOG_CONFIG.name,
    filepath: LOG_CONFIG.filepath,
    loglevel: LOG_CONFIG.loglevel,
  });
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthenticationModule,
    {
      logger,
      transport: Transport.TCP,
      options: {
        host: SERVER_INFO_CONFIG.auth.host,
        port: SERVER_INFO_CONFIG.auth.port,
      },
    }
  );
  app.useGlobalInterceptors(
    new MicroServiceLoggingInterceptor(app.get(Logger))
  );

  app.useGlobalFilters(new RcpExceptionsFilter(app.get(Logger)));
  await app.listen();
}
bootstrap();
