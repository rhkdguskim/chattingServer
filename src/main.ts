import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "src/util/swagger";
import * as config from "config";
import * as cookieParser from "cookie-parser";
import { WinstonModule, utilities, WinstonLogger } from "nest-winston";
import * as winston from "winston";
import { LoggingInterceptor } from "./core/interceptors/logging.interceptor";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            utilities.format.nestLike("KwangTalk")
          ),
        }),
      ],
    }),
  });

  const serverConfig = config.get("server");
  const cors = config.get('cors')
  app.use(cookieParser());
  app.enableCors({
    origin: [cors.frontendHost || process.env.FRONT_END_HOST],
    credentials: true,
  });
  app.useGlobalInterceptors(new LoggingInterceptor(app.get(Logger)));
  setupSwagger(app);
  await app.listen(serverConfig.port);
}
bootstrap();
