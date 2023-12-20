import { Inject, Injectable } from "@nestjs/common";

import { FRIEND_REPOSITORY } from "../friend.metadata";
import { FriendEntity } from "../entity/friend.entity";
import { FriendRepository } from "../repository/friend.repository.interface";
import {
  CreateFriendRequest,
  DeleteFriendRequest,
  UpdateFriendRequest,
} from "../dto/friend.dto";
import { UserEntity } from "@app/authentication/entity/users.entity";
import {
  ChatServerException,
  ChatServerExceptionCode,
} from "@app/common/exception/chatServerException";

@Injectable()
export class FriendServiceImpl implements FriendServiceImpl {
  constructor(
    @Inject(FRIEND_REPOSITORY)
    private friendRepository: FriendRepository
  ) {}

  async getFriends(id: number): Promise<FriendEntity[]> {
    const friends = await this.friendRepository.getMyFriends(id);

    return friends.map((friend) => {
      return new FriendEntity(friend);
    });
  }

  async getMyFriends(id: number): Promise<FriendEntity[]> {
    const friends = await this.friendRepository.getMyFriends(id);
    return friends.map((friend) => {
      return new FriendEntity(friend);
    });
  }

  async addFriend(
    user_id: number,
    createFriend: CreateFriendRequest
  ): Promise<FriendEntity> {
    if (user_id == createFriend.friend_id) {
      throw new ChatServerException({
        code: ChatServerExceptionCode.Forbidden,
        message: "You Can't be as Friend Self",
      });
    }

    const { friend_id, friend_name } = createFriend;

    // 이미 등록된 친구라면
    const friends: FriendEntity[] = await this.getMyFriends(user_id);

    friends.map((friend) => {
      if (friend.friend_id == friend_id) {
        throw new ChatServerException({
          code: ChatServerExceptionCode.Already_Exist,
          message: "Already Exist",
        });
      }
    });

    return new FriendEntity(
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
    const foundFriend = await this.friendRepository.findFriendById({
      user_id: user_id,
      id: delFriend.id,
    });
    if (!foundFriend) {
      throw new ChatServerException({
        code: ChatServerExceptionCode.NotFound,
        message: "Can't Find Friend",
      });
    }
    return this.friendRepository.delete(foundFriend.id);
  }

  async changeFriendName(
    user_id: number,
    updateFriend: UpdateFriendRequest
  ): Promise<any> {
    const { id } = updateFriend;
    const friend: FriendEntity = await this.friendRepository.findFriendById({
      user_id: user_id,
      id,
    });

    if (friend && friend.friend_id == updateFriend.friend_id) {
      return await this.friendRepository.update(id, updateFriend);
    } else {
      throw new ChatServerException({
        code: ChatServerExceptionCode.NotFound,
        message: "Can't Find Friend",
      });
    }
  }
}
