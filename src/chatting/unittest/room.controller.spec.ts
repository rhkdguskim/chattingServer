import { Test, TestingModule } from "@nestjs/testing";
import { ChattingController } from "../chatting.controller";
import { CacheAppModule } from "@src/cacheapp.module";
import { Logger } from "@nestjs/common";
import { DatabaseModule } from "@src/database.module";
import { Chatting } from "../chatting.entity";
import { Participant } from "../participant.entity";
import { Room } from "../room.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReadBy } from "../readby.entity";
import { RoomController } from "../room.controller";
import { RoomService } from "../room.service";

describe("Room Controller", () => {
  let controller: RoomController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[CacheAppModule, DatabaseModule, TypeOrmModule.forFeature([Chatting, Room, Participant, ReadBy]),],
      controllers: [RoomController],
      providers:[Logger,RoomService],
    }).compile();
    
    controller = module.get<RoomController>(RoomController);
  });

  describe("Room Controller",  () => {
    it("should be defined", () => {
      expect(controller).toBeDefined();
    });

    it("GetChattingList", async ()=> {

    })
  })

});
