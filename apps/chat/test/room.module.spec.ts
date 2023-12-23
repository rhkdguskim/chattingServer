import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "@app/common/module";
import { ChatServiceModule } from "@app/chat/module/chat.service.module";
import { ROOM_SERVICE } from "@app/chat/chat.metadata";
import { RoomService } from "@app/chat/providers/room.service.interface";
import { CreateRoomResponse } from "@app/chat/dto/room.dto";
import {
  ServerException,
  ServerExceptionCode,
} from "@app/common/exception/server.exception";
import { RoomType } from "@app/chat/entity/room.entity";

describe("Room Service Test", () => {
  let roomService: RoomService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(typeOrmConfig), ChatServiceModule],
    }).compile();

    roomService = app.get<RoomService>(ROOM_SERVICE);
  });

  it("should be defined", () => {
    expect(roomService).toBeDefined();
  });

  it("Create Private Chatting Room", async () => {
    for (let i = 1; i < 10; i++) {
      try {
        const roomInfo = await roomService.createRoom(i, {
          room_name: `채팅방 ${i}`,
          participant: [],
          room_type: 1,
        });
        expect(roomInfo).toBeInstanceOf(CreateRoomResponse);
        expect(roomInfo.type).toEqual(RoomType.INDIVIDUAL);
      } catch (e) {
        expect(e).toBeInstanceOf(ServerException);
        expect(e.msg.code).toEqual(ServerExceptionCode.Already_Exist);
      }
    }
  });

  it("Create Friend Chatting Room", async () => {
    for (let i = 1; i < 10; i++) {
      try {
        const roomInfo = await roomService.createRoom(i, {
          room_name: `채팅방 ${i} ${i + 1}`,
          participant: [{ id: i }, { id: i + 1 }],
          room_type: 2,
        });
        expect(roomInfo).toBeInstanceOf(CreateRoomResponse);
        expect(roomInfo.type).toEqual(RoomType.TWO);
      } catch (e) {
        expect(e).toBeInstanceOf(ServerException);
        expect(e.msg.code).toEqual(ServerExceptionCode.Already_Exist);
      }
    }
  });

  it("Create Group Chatting Room", async () => {
    for (let i = 1; i < 9; i++) {
      try {
        const roomInfo = await roomService.createRoom(i, {
          room_name: `채팅방 ${i} ${i + 1} ${i + 2}`,
          participant: [{ id: i }, { id: i + 1 }, { id: i + 2 }],
          room_type: 2,
        });
        expect(roomInfo).toBeInstanceOf(CreateRoomResponse);
        expect(roomInfo.type).toEqual(RoomType.GROUP);
      } catch (e) {
        expect(e).toBeInstanceOf(ServerException);
        expect(e.msg.code).toEqual(ServerExceptionCode.Already_Exist);
      }
    }
  });
});
