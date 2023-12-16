import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "@src/util/swagger";
import * as config from "config";
import * as cookieParser from "cookie-parser";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { Logger, ValidationPipe } from "@nestjs/common";
import { MAIN_PORT } from "@app/common/config";
import {getWinstonLogger} from "@app/common/util/util";

async function bootstrap() {
  const logger = getWinstonLogger('APIGateWay', 'ApiGateWay');
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  const cors = config.get("cors");
  app.setGlobalPrefix("api");
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
