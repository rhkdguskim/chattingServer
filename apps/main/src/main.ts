import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { LoggingInterceptor } from "@lib/common/interceptor/logging.interceptor";
import { Logger, ValidationPipe } from "@nestjs/common";
import winstonLogger, {
  winstonLoggerConfig,
} from "@lib/common/logger/nest.winston.logger";
import { ServerExceptionFilter } from "@lib/common/exception/server.exception.filter";
import {
  ServerException,
  ServerExceptionCode,
} from "@lib/common/exception/server.exception";
import {
  CORS_CONFIG,
  LOG_CONFIG,
  SERVER_INFO_CONFIG,
} from "@config/config.interface";
import { setupSwagger } from "@src/util/setup.swagger";

async function bootstrap() {
  const loggerConfig: winstonLoggerConfig = {
    filepath: LOG_CONFIG.filepath,
    loglevel: LOG_CONFIG.loglevel,
    name: LOG_CONFIG.name,
  };
  const logger = winstonLogger(loggerConfig);
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  app.setGlobalPrefix("api");
  app.use(cookieParser());
  app.enableCors({
    origin: CORS_CONFIG.urls,
    credentials: CORS_CONFIG.credentials,
  });
  app.useGlobalInterceptors(new LoggingInterceptor(app.get(Logger)));
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const message = errors
          .map((error) => {
            const constraints = Object.values(error.constraints).join(", ");
            return `${error.property} - ${constraints}`;
          })
          .join("; ");

        return new ServerException({
          code: ServerExceptionCode.Invalid,
          message,
        });
      },
      enableDebugMessages: true,
    })
  );
  setupSwagger(app);
  app.useGlobalFilters(new ServerExceptionFilter());
  await app.listen(SERVER_INFO_CONFIG.main.port);
}
bootstrap();
