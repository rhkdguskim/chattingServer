import { NestFactory } from "@nestjs/core";
import { AuthorizationModule } from "./module/authorization.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";
import winstonLogger from "@app/common/logger/nest.winston.logger";
import { SERVER_INFO_CONFIG } from "@config/config.interface";
import { MicroServiceLoggingInterceptor } from "@app/common/interceptor/micro.service.logging.interceptor";

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
        host: SERVER_INFO_CONFIG.authorization.host,
        port: SERVER_INFO_CONFIG.authorization.port,
      },
    }
  );
  app.useGlobalInterceptors(
    new MicroServiceLoggingInterceptor(app.get(Logger))
  );
  await app.listen();
}
bootstrap();
