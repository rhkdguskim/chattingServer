import { Test, TestingModule } from "@nestjs/testing";
import { ChattingController } from "../chatting.controller";
import { CacheRedisModule } from "@src/cacheRedis.module";
import { ForbiddenException, Logger } from "@nestjs/common";
import { DatabaseModule } from "@src/database.module";
import { Chatting } from "../chatting.entity";
import { Participant } from "../participant.entity";
import { Room } from "../room.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReadBy } from "../readby.entity";
import { RoomController } from "../room.controller";
import { RoomService } from "../room.service";
import { CreateRoomReqeust } from "../dto/chatting.dto";
import { User } from "@src/users/users.entity";

describe("Room Controller", () => {
  let controller: RoomController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[CacheRedisModule, DatabaseModule, TypeOrmModule.forFeature([Chatting, Room, Participant, ReadBy]),],
      controllers: [RoomController],
      providers:[Logger,RoomService],
    }).compile();
    
    controller = module.get<RoomController>(RoomController);
  });

  describe("Room Controller",  () => {
    it("should be defined", () => {
      expect(controller).toBeDefined();
    });

    // 참가자가 아예 없는경우
    it("GetChattingList", async ()=> {
      
      const request : CreateRoomReqeust = {
        room_name : "TestRoom",
        participant : [],
      }
      try {
        await controller.CreateRoom(request, 1);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException)
      }
    })

    
  })

});
