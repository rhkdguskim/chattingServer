import { NestFactory } from "@nestjs/core";
import { AuthenticationModule } from "./module/authentication.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";
import { RcpExceptionsFilter } from "@app/common/exception/server.exception.filter";
import winstonLogger from "@app/common/logger/nest.winston.logger";
import { SERVER_INFO_CONFIG } from "../../../config/config.interface";
import { MicroServiceLoggingInterceptor } from "@app/common/interceptor/micro.service.logging.interceptor";

async function bootstrap() {
  const logger = winstonLogger({
    name: "AuthenticationMicroService",
    filepath: "AuthenticationMicroService",
    loglevel: "debug",
  });
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthenticationModule,
    {
      logger,
      transport: Transport.TCP,
      options: {
        host: SERVER_INFO_CONFIG.authentication.host,
        port: SERVER_INFO_CONFIG.authentication.port,
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
