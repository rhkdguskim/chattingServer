import { Logger, Module } from "@nestjs/common";
import { ChattingController } from "./chatting.controller";
import { RoomController } from "./room.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import {
  CHAT_HOST,
  CHAT_PORT,
  FRIEND_HOST,
  FRIEND_PORT,
  ROOM_HOST,
  ROOM_PORT,
} from "@app/common/config";
import { ROOM_SERVICE } from "@app/common/message/room";
import { CHAT_SERVICE } from "@app/common/message/chat";
import { AuthClientsModule } from "@app/common/module/authclients.module";
import { ChattingService } from "@src/chatting/chatting.service";
import { RoomService } from "@src/chatting/room.service";

@Module({
  imports: [
    AuthClientsModule,
    ClientsModule.register([
      {
        name: ROOM_SERVICE,
        transport: Transport.TCP,
        options: { host: ROOM_HOST, port: ROOM_PORT },
      },
      {
        name: CHAT_SERVICE,
        transport: Transport.TCP,
        options: { host: CHAT_HOST, port: CHAT_PORT },
      },
    ]),
  ],
  controllers: [ChattingController, RoomController],
  providers: [Logger, ChattingService, RoomService],
})
export class ChattingModule {}
