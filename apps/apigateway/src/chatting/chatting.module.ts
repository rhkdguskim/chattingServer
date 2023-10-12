import { Logger, Module } from "@nestjs/common";
import { ChattingController } from "./chatting.controller";
import { RoomService } from "./room.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChattingGateway } from "./chatting.gateway";
import { ChattingService } from "./chatting.service";
import { UsersModule } from "@src/users/users.module";
import { RoomController } from "./room.controller";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {CHAT_HOST, CHAT_PORT, FRIEND_HOST, FRIEND_PORT, ROOM_HOST, ROOM_PORT} from "@app/common/config";
import {ROOM_SERVICE} from "@app/common/message/room";
import {CHAT_SERVICE} from "@app/common/message/chat";
import {Chatting, Participant, ReadBy, Room} from "@app/common/entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Chatting, Room, Participant, ReadBy]),
    UsersModule,
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
  providers: [RoomService, ChattingService, ChattingGateway, Logger],
})
export class ChattingModule {}
