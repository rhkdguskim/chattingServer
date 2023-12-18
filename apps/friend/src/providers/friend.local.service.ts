import {
  ForbiddenException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";

import { FRIEND_REPOSITORY } from "../friend.metadata";
import { FriendEntity } from "../entity/friend.entity";
import {FriendService} from "./friend.service.interface";
import {FriendRepository} from "../repository/friend.repository.interface";
import {CreateFriendRequest, CreateFriendResponse, DeleteFriendRequest, UpdateFriendRequest} from "../dto/friend.dto";
import {UserEntity} from "@app/authentication/entity/users.entity";
import {CustomException, ExceptionType} from "@app/common/exception/custom.exception";

@Injectable()
export class FriendLocalService implements FriendService {
  constructor(
    @Inject(FRIEND_REPOSITORY)
    private friendRepository: FriendRepository
  ) {}

  async getFriends(id: number): Promise<FriendEntity[]> {
    const friends = await this.friendRepository.getMyFriends(id)

    return friends.map((friend) => {
      return new FriendEntity(friend)
    })
  }

  async getMyFriends(id: number): Promise<FriendEntity[]> {
    const friends = await this.friendRepository.getMyFriends(id);
    return friends.map(friend => {
      return new FriendEntity(friend)
    });
  }

  async addFriend(user_id:number,
    createFriend: CreateFriendRequest
  ): Promise<FriendEntity> {
    if (user_id == createFriend.friend_id) {
      throw new CustomException({code: ExceptionType.FORBIDDEN,
        message: "자기자신을 친구로 설정 할 수 없습니다."})
    }

    const { friend_id, friend_name } = createFriend;

    // 이미 등록된 친구라면
    const friends: FriendEntity[] = await this.getMyFriends(user_id);

    friends.map((friend) => {
      if (friend.friend_id == friend_id) {
        throw new CustomException({code: ExceptionType.ALREADY_EXIST,
          message: "이미 등록된 친구입니다."})
      }
    });

    return new FriendEntity(await this.friendRepository.create({
      user : {id:user_id} as UserEntity,
      friend_id,
      friend_name
    }));
  }

  async delFriend(user_id:number,
    delFriend: DeleteFriendRequest,
  ): Promise<any> {
    const foundFriend = await this.friendRepository.findFriendById({user_id:user_id, id:delFriend.id});
    if (!foundFriend) {
      throw new CustomException({
        code: ExceptionType.NOT_FOUND, message: "Can't Find Friend"
      });
    }
    return this.friendRepository.delete(foundFriend.id);
  }

  async changeFriendName(
      user_id:number,
    updateFriend: UpdateFriendRequest,
  ): Promise<any> {

    const { id, friend_id, friend_name } = updateFriend;
    const friend: FriendEntity = await this.friendRepository.findFriendById({user_id:user_id, id})

    if (friend && friend.friend_id == updateFriend.friend_id) {
      return await this.friendRepository.update(id, updateFriend);
    } else {
      throw new CustomException({
        code: ExceptionType.NOT_FOUND, message: "Can't Find Friend"
      });
    }
  }
}
