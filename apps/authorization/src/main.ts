import { NestFactory } from "@nestjs/core";
import { AuthorizationModule } from "./module/authorization.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { LoggingInterceptor } from "@app/common/interceptor";
import { Logger } from "@nestjs/common";
import {
  AUTHORIZAION_HOST,
  AUTHORIZAION_PORT,
  LOGLEVEL,
} from "@app/common/config";
import winstonLogger from "@app/common/logger/nestwinstonlogger";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthorizationModule,
    {
      logger: winstonLogger({
        name: "Authorization MicroService",
        loglevel: "debug",
        filepath: "Authorization MicroService",
      }),
      transport: Transport.TCP,
      options: {
        host: AUTHORIZAION_HOST,
        port: AUTHORIZAION_PORT,
      },
    }
  );
  app.useGlobalInterceptors(new LoggingInterceptor(app.get(Logger)));
  await app.listen();
}
bootstrap();
