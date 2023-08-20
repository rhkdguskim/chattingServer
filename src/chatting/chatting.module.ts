import { Logger, Module } from "@nestjs/common";
import { ChattingController } from "./chatting.controller";
import { RoomService } from "./room.service";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Participant } from "./participant.entity";
import { Chatting } from "./chatting.entity";
import { Room } from "./room.entity";
import { ChattingGateway } from "./chatting.gateway";
import { ChattingService } from "./chatting.service";
import { UsersModule } from "src/users/users.module";
import { ReadBy } from "./readby.entity";
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
