import { NestFactory } from "@nestjs/core";
import { ChatModule } from "./chat.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { utilities, WinstonModule } from "nest-winston";
import { CHAT_HOST, CHAT_PORT, LOGLEVEL } from "@app/common/config";
import * as winston from "winston";
import { CHAT_SERVICE } from "@app/common/message/chat";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ChatModule,
    {
      logger: WinstonModule.createLogger({
        level: LOGLEVEL,
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              utilities.format.nestLike(CHAT_SERVICE)
            ),
          }),
        ],
      }),
      transport: Transport.TCP,
      options: {
        host: CHAT_HOST,
        port: CHAT_PORT,
      },
    }
  );
  await app.listen();
}
bootstrap();
