import { Test, TestingModule } from "@nestjs/testing";
import { ChattingController } from "../chatting.controller";
import { CacheRedisModule } from "@src/util/cacheRedis.module";
import { ForbiddenException, Logger, ValidationPipe } from "@nestjs/common";
import { DatabaseModule } from "@src/util/database.module";
import { Chatting } from "../../entitys/chatting.entity";
import { Participant } from "@src/entitys/participant.entity";
import { Room } from "@src/entitys/room.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReadBy } from "../../entitys/readby.entity";
import { RoomController } from "../room.controller";
import { RoomService } from "../room.service";
import { CreateRoomReqeust } from "../dto/room.dto";
import { User } from "@src/entitys/users.entity";
import { JwtStrategy } from "@src/auth/guards/jwt.strategy";
import { AuthModule } from "@src/auth/auth.module";

describe("Room Controller", () => {
  let controller: RoomController;
  let validationPipe: ValidationPipe;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheRedisModule,
        DatabaseModule,
        AuthModule,
        TypeOrmModule.forFeature([Chatting, Room, Participant, ReadBy]),
      ],
      controllers: [RoomController],
      providers: [JwtStrategy, Logger, RoomService],
    }).compile();

    validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        return new ForbiddenException(errors);
      },
    });

    controller = module.get<RoomController>(RoomController);
  });

  describe("Room Controller", () => {
    it("should be defined", () => {
      expect(controller).toBeDefined();
    });

    // 참가자가 아예 없는경우
    it("GetChattingList", async () => {
      const request: CreateRoomReqeust = {
        room_name: "TestRoom",
        participant: [],
      };
      try {
        const transformedRequest = await validationPipe.transform(request, {
          type: "body",
          metatype: CreateRoomReqeust,
        }); // Validation Test
        await controller.CreateRoom(transformedRequest, 1);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
      }
    });
  });
});
