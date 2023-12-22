import { NestFactory } from "@nestjs/core";
import { ChatModule } from "./module/chat.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { CHAT_HOST, CHAT_PORT } from "@app/common/config";
import winstonLogger from "@app/common/logger/nestwinstonlogger";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ChatModule,
    {
      logger: winstonLogger({
        filepath: "Chatting MicroService",
        loglevel: "debug",
        name: "Chatting MicroService",
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
