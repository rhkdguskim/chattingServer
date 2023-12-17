import { NestFactory } from "@nestjs/core";
import { AuthenticationModule } from "./module/authentication.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { LoggingInterceptor } from "@app/common/interceptor";
import { Logger } from "@nestjs/common";

import {
  AUTHENTICATION_HOST,
  AUTHENTICATION_PORT,
} from "@app/common/config";
import { RcpExceptionsFilter } from "@app/common/exception/exception.filter";
import winstonLogger from "@app/common/logger/nestwinstonlogger";

async function bootstrap() {
    const logger = winstonLogger({
        name : "AuthenticationMicroService",
        filepath: "AuthenticationMicroService",
        loglevel: "debug"
    });
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthenticationModule.forRoot({ isDev: false, isMicroService: true }),
    {
      logger,
      transport: Transport.TCP,
      options: {
        host: AUTHENTICATION_HOST,
        port: AUTHENTICATION_PORT,
      },
    }
  );
  app.useGlobalInterceptors(new LoggingInterceptor(app.get(Logger)));
  app.useGlobalFilters(new RcpExceptionsFilter(app.get(Logger)));
  await app.listen();
}
bootstrap();
