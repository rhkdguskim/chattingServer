import { Logger, Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { DatabaseModule } from "@app/common/module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Chatting, Participant } from "@app/common/entity";
import { ChatGateway } from "./chat.gateway";
import { ClientsModule, Transport } from "@nestjs/microservices";
import {
  FRIEND_HOST,
  FRIEND_PORT,
  ROOM_HOST,
  ROOM_PORT,
} from "@app/common/config";
import { ROOM_SERVICE } from "@app/common/message/room";

@Module({
  imports: [
    DatabaseModule(),
    TypeOrmModule.forFeature([Chatting, Participant]),
    ClientsModule.register([
      {
        name: ROOM_SERVICE,
        transport: Transport.TCP,
        options: { host: ROOM_HOST, port: ROOM_PORT },
      },
      // 다른 서비스도 필요한 경우 추가
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, Logger],
})
export class ChatModule {}
