import { Test, TestingModule } from "@nestjs/testing";
import { ChattingController } from "../chatting.controller";
import { CacheRedisModule } from "@src/util/cacheRedis.module";
import { Logger } from "@nestjs/common";
import { ChattingService } from "../chatting.service";
import { DatabaseModule } from "@src/util/database.module";
import { Chatting } from "../../entitys/chatting.entity";
import { Participant } from "@src/entitys/participant.entity";
import { Room } from "@src/entitys/room.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReadBy } from "../../entitys/readby.entity";
import { AuthorizationJwtStrategy } from "@app/authorization/guards/authorization.jwt.strategy";
import { AuthModule } from "@src/auth/auth.module";

describe("ChattingController", () => {
  let controller: ChattingController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheRedisModule,
        DatabaseModule,
        AuthModule,
        TypeOrmModule.forFeature([Chatting, Room, Participant, ReadBy]),
      ],
      controllers: [ChattingController],
      providers: [AuthorizationJwtStrategy, Logger, ChattingService],
    }).compile();

    controller = module.get<ChattingController>(ChattingController);
  });

  describe("ChattingController", () => {
    it("should be defined", () => {
      expect(controller).toBeDefined();
    });

    it("GetChattingList", async () => {
      const result = await controller.GetChattingList(1, null);
      expect(result).toBeInstanceOf(Array);
    });
  });
});
