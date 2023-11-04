import { Logger, Module } from "@nestjs/common";
import { ChattingController } from "./chatting.controller";
import { RoomController } from "./room.controller";
import { ChattingService } from "@src/chatting/chatting.service";
import { RoomService } from "@src/chatting/room.service";

@Module({
  imports: [],
  controllers: [ChattingController, RoomController],
  providers: [Logger, ChattingService, RoomService],
})
export class ChattingModule {}
