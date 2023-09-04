import { Logger, Module } from "@nestjs/common";
import { ChattingController } from "./chatting.controller";
import { RoomService } from "./room.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Participant } from "@src/entitys/participant.entity";
import { Chatting } from "@src/entitys/chatting.entity";
import { Room } from "@src/entitys/room.entity";
import { ChattingGateway } from "./chatting.gateway";
import { ChattingService } from "./chatting.service";
import { UsersModule } from "@src/users/users.module";
import { ReadBy } from "../entitys/readby.entity";
import { RoomController } from "./room.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Chatting, Room, Participant, ReadBy]),
    UsersModule,
  ],
  controllers: [ChattingController, RoomController],
  providers: [RoomService, ChattingService, ChattingGateway, Logger],
})
export class ChattingModule {}
