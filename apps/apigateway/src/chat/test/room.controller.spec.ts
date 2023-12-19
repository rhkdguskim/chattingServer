import { Test, TestingModule } from "@nestjs/testing";
import { ChatHttpController } from "../../../../chat/src/controller/chat.http.controller";
import { CacheRedisModule } from "@src/util/cacheRedis.module";
import { ForbiddenException, Logger, ValidationPipe } from "@nestjs/common";
import { DatabaseModule } from "@src/util/database.module";
import { Chatting } from "../../entitys/chat.entity";
import { Participant } from "@src/entitys/participant.entity";
import { Room } from "@src/entitys/room.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReadBy } from "../../entitys/readby.entity";
import { RoomHttpController } from "../../../../chat/src/controller/room.http.controller";
import { RoomService } from "../room.service";
import { User } from "@src/entitys/users.entity";
import { AuthorizationJwtStrategy } from "@app/authorization/guards/authorization.jwt.strategy";
import { AuthModule } from "@src/auth/auth.module";

import {CreateRoomRequest} from "../../../../chat/src/dto/room.dto";

describe("Room Controller", () => {
  let controller: RoomHttpController;
  let validationPipe: ValidationPipe;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheRedisModule,
        DatabaseModule,
        AuthModule,
        TypeOrmModule.forFeature([Chatting, Room, Participant, ReadBy]),
      ],
      controllers: [RoomHttpController],
      providers: [AuthorizationJwtStrategy, Logger, RoomService],
    }).compile();

    validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        return new ForbiddenException(errors);
      },
    });

    controller = module.get<RoomHttpController>(RoomHttpController);
  });

  describe("Room Controller", () => {
    it("should be defined", () => {
      expect(controller).toBeDefined();
    });

    // 참가자가 아예 없는경우
    it("GetChattingList", async () => {
      const request: CreateRoomRequest = {
        room_name: "TestRoom",
        participant: [],
      };
      try {
        const transformedRequest = await validationPipe.transform(request, {
          type: "body",
          metatype: CreateRoomRequest,
        }); // Validation Test
        await controller.CreateRoom(transformedRequest, 1);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
      }
    });
  });
});
