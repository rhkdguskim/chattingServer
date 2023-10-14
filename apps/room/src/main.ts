import { NestFactory } from "@nestjs/core";
import { RoomModule } from "./room.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { utilities, WinstonModule } from "nest-winston";
import { LOGLEVEL, ROOM_HOST, ROOM_PORT } from "@app/common/config";
import * as winston from "winston";
import { FRIEND_SERVICE } from "@app/common/message/friend";
import { ROOM_SERVICE } from "@app/common/message/room";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RoomModule,
    {
      logger: WinstonModule.createLogger({
        level: LOGLEVEL,
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              utilities.format.nestLike(ROOM_SERVICE)
            ),
          }),
        ],
      }),
      transport: Transport.TCP,
      options: {
        host: ROOM_HOST,
        port: ROOM_PORT,
      },
    }
  );
  await app.listen();
}
bootstrap();
