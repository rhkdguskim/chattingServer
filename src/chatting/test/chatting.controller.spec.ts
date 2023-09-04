import { Test, TestingModule } from "@nestjs/testing";
import { ChattingController } from "../chatting.controller";
import { CacheRedisModule } from "@src/util/cacheRedis.module";
import { Logger } from "@nestjs/common";
import { ChattingService } from "../chatting.service";
import { DatabaseModule } from "@src/database.module";
import { Chatting } from "../../entitys/chatting.entity";
import { Participant } from "../participant.entity";
import { Room } from "../room.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReadBy } from "../../entitys/readby.entity";

describe("ChattingController", () => {
  let controller: ChattingController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[CacheRedisModule, DatabaseModule, TypeOrmModule.forFeature([Chatting, Room, Participant, ReadBy]),],
      controllers: [ChattingController],
      providers:[Logger,ChattingService],
    }).compile();
    
    controller = module.get<ChattingController>(ChattingController);
  });

  describe("ChattingController",  () => {
    it("should be defined", () => {
      expect(controller).toBeDefined();
    });

    it("GetChattingList", async ()=> {
      const result = await controller.GetChattingList(1, null)
      expect(result).toBeInstanceOf(Array);
    })

  })

});
