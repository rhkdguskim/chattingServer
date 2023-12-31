import { Test, TestingModule } from "@nestjs/testing";
import { UserServiceModule } from "@app/user/module/user.service.module";
import { FriendService } from "@app/user/providers/friend.service.interface";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServerException } from "@lib/common/exception/server.exception";
import { FRIEND_SERVICE, USER_SERVICE } from "@app/user/user.metadata";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";
import { typeOrmConfig } from "@lib/common/database/typeorm.config";
import { UserService } from "@app/user/providers/user.service.interface";
import { UserInfoResponse } from "@app/user/dto/user.dto";

describe("User Service Test", () => {
  let userService: UserService;
  let friendService: FriendService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmConfig as DataSourceOptions),
        UserServiceModule,
      ],
    }).compile();

    friendService = app.get<FriendService>(FRIEND_SERVICE);
    userService = app.get<UserService>(USER_SERVICE);
  });

  it("should be defined", () => {
    expect(userService).toBeDefined();
    expect(friendService).toBeDefined();
  });

  it("Delete All Users", async () => {
    const users = await userService.findAllUsers();
    users.map(async (user) => {
      return await userService.deleteUser(user.id);
    });
  });

  it("Delete All Users && Friends", async () => {
    const users = await userService.findAllUsers();
    users.map(async (user) => {
      const friends = await friendService.getFriends(user.id);

      try {
        await Promise.all(
          friends.map(async (friend) => {
            return await friendService.delFriend(user.id, {
              friend_id: friend.id,
            });
          })
        );
      } catch (e) {
        expect(e).toBeInstanceOf(ServerException);
      }

      try {
        await userService.deleteUser(user.id);
      } catch (e) {
        expect(e).toBeInstanceOf(ServerException);
      }
    });
  });

  const users: UserInfoResponse[] = new Array<UserInfoResponse>();

  it("ADD Users", async () => {
    for (let i = 0; i < 10; i++) {
      users.push(
        await userService.register({
          name: `TestUserName${i}`,
          password: `TestUserPassword${i}`,
          status_msg: `Hi TestUser${i}`,
          user_id: `TestUser${i}`,
        })
      );
    }

    expect(users.length).toEqual(10);
  });

  it("Update Users", async () => {
    users.map(async (user) => {
      await userService.updateUser(user.id, {
        ...user,
        status_msg: `${user.status_msg} Updated`,
      });

      const test = await userService.findUserByID(user.id);
      expect(test.status_msg).toContain("Updated");
    });
  });

  it("ADD Friends", async () => {
    const users = await userService.findAllUsers();

    for (const user1 of users) {
      for (const user2 of users) {
        if (user1.id !== user2.id) {
          const friend = await friendService.addFriend(user1.id, {
            friend_id: user2.id,
            friend_name: user2.name,
          });
          expect(friend.friend_name).toEqual(user2.name);
          expect(friend.friend_id).toEqual(user2.id);
        }
      }
    }
  });

  it("Update Friends", async () => {
    const users = await userService.findAllUsers();

    for (const user1 of users) {
      const friends = await friendService.getFriends(user1.id);
      for (const friend of friends) {
        await friendService.changeFriendName(user1.id, {
          friend_id: friend.id,
          friend_name: `${friend.name} Updated`,
        });
      }

      const updated_friends = await friendService.getFriends(user1.id);
      for (const new_friend of updated_friends) {
        expect(new_friend.name).toContain("Updated");
      }
    }
  });
});
