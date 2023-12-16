import { NestFactory } from "@nestjs/core";
import { AuthenticationModule } from "./module/authentication.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { LoggingInterceptor } from "@app/common/interceptor";
import { Logger } from "@nestjs/common";
import { utilities, WinstonModule } from "nest-winston";
import * as winston from "winston";

import {
  AUTHENTICATION_HOST,
  AUTHENTICATION_PORT,
  LOGLEVEL,
} from "@app/common/config";
import { RcpExceptionsFilter } from "@app/common/exception/exception.filter";
import {AUTHENTICATION_SERVICE} from "./authentication.metadata";

async function bootstrap() {
    const logger = WinstonModule.createLogger({
        level: LOGLEVEL,
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.ms(),
                    winston.format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss.SSS'
                    }),
                    utilities.format.nestLike(AUTHENTICATION_SERVICE)
                ),

            }),
            new winston.transports.File({
                filename : "log/Authentication.log",
                format: winston.format.combine(
                    winston.format.ms(),
                    winston.format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss.SSS'
                    }),
                    utilities.format.nestLike(AUTHENTICATION_SERVICE),
                ),
            }),
        ],
    })
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
