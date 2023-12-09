import {
  ForbiddenException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";

import {
  CreateFriendRequest,
  CreateFriendResponse,
  DelteFriendRequest,
} from "@app/common/dto/friend.createfriend.dto";
import { FRIEND_REPOSITORY, FriendRepository, FriendService } from "./friend.interface";
import { Friend } from "@app/common/entity/friend.entity";

@Injectable()
export class FriendServiceImpl implements FriendService {
  constructor(
    @Inject(FRIEND_REPOSITORY)
    private friendRepository: FriendRepository
  ) {}

  async getFriends(id: number): Promise<Friend[]> {
    return this.friendRepository.getMyFriends(id);
  }

  async getMyFriends(id: number): Promise<Friend[]> {
    return await this.friendRepository.getMyFriends(id);
  }

  async addFriend(
    createFriend: CreateFriendRequest
  ): Promise<CreateFriendResponse> {
    const { friend_id, friend_name } = createFriend;
    const friend = await this.friendRepository.create({
      friend_id,
      friend_name,
    });

    // 이미 등록된 친구라면
    const friends: Friend[] = await this.getMyFriends(createFriend.id);
    friends.map((myfriend: Friend) => {
      if (myfriend.friend_id == friend_id) {
        Logger.log("이미 등록된 친구입니다.");
        throw new ForbiddenException({
          statusCode: HttpStatus.FORBIDDEN,
          message: [`이미 등록된 친구입니다.`],
          error: "Forbidden",
        });
      }
    });
    return await this.friendRepository.create(friend);
  }

  async delFriend(
    delFriend: DelteFriendRequest,
  ): Promise<any> {
    // 해당 Friend가 현재 유저에 속하는지 확인
    const foundFriend = await this.friendRepository.findFirendById({id:delFriend.id, friend_id:delFriend.friend_id});
    if (!foundFriend) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이 친구는 삭제할 수 없습니다.`],
        error: "Forbidden",
      });
    }

    return this.friendRepository.delete(foundFriend.id);
  }

  async changeFriendName(
    createFriend: CreateFriendRequest,
  ): Promise<any> {
    const { friend_id, friend_name } = createFriend;
    const friend: Friend = await this.friendRepository.findFirendById({id:createFriend.id, friend_id : createFriend.friend_id})
    if (friend) {
      friend.friend_name = friend_name;
      return await this.friendRepository.update(createFriend.friend_id, createFriend);
    } else {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`해당하는 친구가 없습니다.`],
        error: "Forbidden",
      });
    }
  }
}
