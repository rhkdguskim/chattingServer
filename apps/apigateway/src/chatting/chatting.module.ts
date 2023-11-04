import { Logger, Module } from "@nestjs/common";
import { ChattingController } from "./chatting.controller";
import { RoomController } from "./room.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import {
  AUTHENTICATION_HOST,
  AUTHENTICATION_PORT,
  AUTHORIZAION_HOST,
  AUTHORIZAION_PORT,
  CHAT_HOST,
  CHAT_PORT,
  FRIEND_HOST,
  FRIEND_PORT,
  ROOM_HOST,
  ROOM_PORT,
} from "@app/common/config";
import { ROOM_SERVICE } from "@app/common/message/room";
import { CHAT_SERVICE } from "@app/common/message/chat";
import { ClientCustomProxyModule } from "@app/common/module/clientcustomproxy.module";
import { ChattingService } from "@src/chatting/chatting.service";
import { RoomService } from "@src/chatting/room.service";
import { AUTHENTICATION_SERVICE } from "@app/common/message/authentication";
import { AUTHORIZATION_SERVICE } from "@app/common/message/authorization";

@Module({
  imports: [
    ClientCustomProxyModule.register({
      clients: [
        {
          name: AUTHENTICATION_SERVICE,
          config: {
            transport: Transport.TCP,
            options: { host: AUTHENTICATION_HOST, port: AUTHENTICATION_PORT },
          },
        },
        {
          name: AUTHORIZATION_SERVICE,
          config: {
            transport: Transport.TCP,
            options: { host: AUTHORIZAION_HOST, port: AUTHORIZAION_PORT },
          },
        },
        {
          name: ROOM_SERVICE,
          config: {
            transport: Transport.TCP,
            options: { host: ROOM_HOST, port: ROOM_PORT },
          },
        },
        {
          name: CHAT_SERVICE,
          config: {
            transport: Transport.TCP,
            options: { host: CHAT_HOST, port: CHAT_PORT },
          },
        },
      ],
    }),
  ],
  controllers: [ChattingController, RoomController],
  providers: [Logger, ChattingService, RoomService],
})
export class ChattingModule {}
