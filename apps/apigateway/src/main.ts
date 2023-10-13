import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "@src/util/swagger";
import * as config from "config";
import * as cookieParser from "cookie-parser";
import { WinstonModule, utilities, WinstonLogger } from "nest-winston";
import * as winston from "winston";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { Logger, ValidationPipe } from "@nestjs/common";
import { LOGLEVEL, MAIN_HOST, MAIN_PORT } from "@app/common/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: LOGLEVEL,
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            utilities.format.nestLike("API Gateway")
          ),
        }),
      ],
    }),
  });

  const cors = config.get("cors");
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    origin: [
      "https://web-kakaotalk-frontend-eu1k2lllawv5vy.sel3.cloudtype.app",
      "http://localhost:3001",
      cors.frontendHost || process.env.FRONT_END_HOST,
    ],
    credentials: true,
  });
  app.useGlobalInterceptors(new LoggingInterceptor(app.get(Logger)));
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
    })
  );
  setupSwagger(app);
  await app.listen(MAIN_PORT);
}
bootstrap();
