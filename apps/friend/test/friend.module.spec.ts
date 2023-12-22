import { Test, TestingModule } from "@nestjs/testing";
import { FriendServiceModule } from "@app/friend/module/friend.service.module";
import { FriendService } from "@app/friend/providers/friend.service.interface";
import { FRIEND_SERVICE } from "@app/friend/friend.message";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "@app/common/module";
import {
  CreateFriendRequest,
  CreateFriendResponse,
  DeleteFriendRequest,
  UpdateFriendRequest,
} from "@app/friend/dto/friend.dto";
import {
  ChatServerException,
  ChatServerExceptionCode,
} from "@app/common/exception/chatServerException";
import { UserInfoResponse } from "@app/authentication/dto/authenticaion.dto";

describe("Friend Service Test", () => {
  let friendService: FriendService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        FriendServiceModule.forRoot({ isDev: false, isGlobal: false }),
      ],
    }).compile();

    friendService = app.get<FriendService>(FRIEND_SERVICE);
  });

  it("should be defined", () => {
    expect(friendService).toBeDefined();
  });

  it("Find && Delete Friend", async () => {
    for (let i = 1; i < 11; i++) {
      try {
        const friends = await friendService.getFriends(i);
        expect(friends).toBeInstanceOf(Array<UserInfoResponse>);

        friends.map(async (friend) => {
          const delFriendRequest: DeleteFriendRequest = {
            friend_id: friend.id,
          };
          const result = await friendService.delFriend(i, delFriendRequest);
          expect(result).toBe(true);
        });
      } catch (e) {
        expect(e).toBeInstanceOf(ChatServerException);
        expect(e.msg.code).toEqual(ChatServerExceptionCode.NotFound);
      }
    }
  });

  it("friend ADD", async () => {
    for (let i = 1; i < 11; i++) {
      for (let j = 1; j < 11; j++) {
        if (i != j) {
          const createFriendRequest: CreateFriendRequest = {
            friend_id: j,
            friend_name: `나의친구${j}`,
          };
          try {
            const friend = await friendService.addFriend(
              i,
              createFriendRequest
            );
            expect(friend).toBeInstanceOf(CreateFriendResponse);
          } catch (e) {
            expect(e).toBeInstanceOf(ChatServerException);
            expect(e.msg.code).toEqual(ChatServerExceptionCode.Already_Exist);
          }
        }
      }
    }
  });

  it("friend Update", async () => {
    for (let i = 1; i < 11; i++) {
      for (let j = 1; j < 11; j++) {
        if (i != j) {
          const updateFriendRequest: UpdateFriendRequest = {
            friend_id: j,
            friend_name: `가짜친구${j}`,
          };
          try {
            const friend = await friendService.changeFriendName(
              i,
              updateFriendRequest
            );
            expect(friend).toBeTruthy();
          } catch (e) {
            expect(e).toBeInstanceOf(ChatServerException);
          }
        }
      }
    }
  });
});
