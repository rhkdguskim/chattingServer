import { NestFactory } from "@nestjs/core";
import { AuthorizationModule } from "./module/authorization.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { MicroServiceLoggingInterceptor } from "@app/common/interceptor";
import { Logger } from "@nestjs/common";
import { AUTHORIZATION_HOST, AUTHORIZATION_PORT } from "@app/common/config";
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
        host: AUTHORIZATION_HOST,
        port: AUTHORIZATION_PORT,
      },
    }
  );
  app.useGlobalInterceptors(
    new MicroServiceLoggingInterceptor(app.get(Logger))
  );
  await app.listen();
}
bootstrap();
