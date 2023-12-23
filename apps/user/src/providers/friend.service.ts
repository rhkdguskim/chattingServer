import { Inject, Injectable } from "@nestjs/common";

import { FRIEND_REPOSITORY } from "../user.metadata";
import { FriendEntity } from "../entity/friend.entity";
import { FriendRepository } from "../repository/friend.repository.interface";
import {
  CreateFriendRequest,
  CreateFriendResponse,
  DeleteFriendRequest,
  UpdateFriendRequest,
} from "../dto/friend.dto";
import { UserEntity } from "@app/user/entity/users.entity";
import {
  ServerException,
  ServerExceptionCode,
} from "@app/common/exception/server.exception";
import { FriendService } from "@app/user/providers/friend.service.interface";

import { UserInfoResponse } from "@app/user/dto/user.dto";

@Injectable()
export class FriendServiceImpl implements FriendService {
  constructor(
    @Inject(FRIEND_REPOSITORY)
    private friendRepository: FriendRepository
  ) {}

  async getFriends(user_id: number): Promise<UserInfoResponse[]> {
    const friends = await this.friendRepository.getFriends(user_id);

    return friends.map((friend) => {
      return new UserInfoResponse(friend);
    });
  }

  async addFriend(
    user_id: number,
    createFriend: CreateFriendRequest
  ): Promise<CreateFriendResponse> {
    if (user_id == createFriend.friend_id) {
      throw new ServerException({
        code: ServerExceptionCode.Forbidden,
        message: "You Can't be as Friend Self",
      });
    }
    const { friend_id, friend_name } = createFriend;

    const friend: FriendEntity = await this.friendRepository.findFriend({
      user_id,
      friend_id,
    });

    if (friend) {
      throw new ServerException({
        code: ServerExceptionCode.Already_Exist,
        message: "Already Exist",
      });
    }

    return new CreateFriendResponse(
      await this.friendRepository.create({
        user: { id: user_id } as UserEntity,
        friend_id,
        friend_name,
      })
    );
  }

  async delFriend(
    user_id: number,
    delFriend: DeleteFriendRequest
  ): Promise<boolean> {
    const foundFriend = await this.friendRepository.findFriend({
      user_id: user_id,
      friend_id: delFriend.friend_id,
    });
    if (!foundFriend) {
      throw new ServerException({
        code: ServerExceptionCode.NotFound,
        message: "Can't Find Friend",
      });
    }
    return this.friendRepository.delete(foundFriend.id);
  }

  async changeFriendName(
    user_id: number,
    updateFriend: UpdateFriendRequest
  ): Promise<boolean> {
    const friend: FriendEntity = await this.friendRepository.findFriend({
      user_id: user_id,
      friend_id: updateFriend.friend_id,
    });

    if (friend && friend.friend_id == updateFriend.friend_id) {
      if (friend.friend_name === updateFriend.friend_name) {
        throw new ServerException({
          code: ServerExceptionCode.Already_Exist,
          message: "Same Friend Name",
        });
      }

      return await this.friendRepository.update(user_id, {
        ...updateFriend,
      });
    } else {
      throw new ServerException({
        code: ServerExceptionCode.NotFound,
        message: "Can't Find Friend",
      });
    }
  }
}
