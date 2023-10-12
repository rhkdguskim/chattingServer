import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Friend } from "@app/common/entity";
import { DeleteResult, Repository } from "typeorm";
import {
  CreateFriendRequest,
  CreateFriendResponse,
  DelteFriendRequest,
} from "@app/common/dto/friend.createfriend.dto";

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>
  ) {}

  async getFriends(id: number): Promise<Friend[]> {
    return await this.friendRepository.find({
      where: { user: { id } },
    });
  }

  async getMyFriends(id: number): Promise<Friend[]> {
    return await this.friendRepository.find({
      where: { user: { id } },
    });
  }

  async addFriend(
    createFriend: CreateFriendRequest,
    id: number
  ): Promise<CreateFriendResponse> {
    const { friend_id, friend_name } = createFriend;
    const friend = this.friendRepository.create({
      friend_id,
      friend_name,
      user: { id },
    });

    // 이미 등록된 친구라면
    const friends: Friend[] = await this.getMyFriends(id);
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
    return await this.friendRepository.save(friend);
  }

  async delFriend(
    delFriend: DelteFriendRequest,
    id: number
  ): Promise<DeleteResult> {
    // 해당 Friend가 현재 유저에 속하는지 확인
    const foundFriend = await this.friendRepository.findOne({
      where: { id: delFriend.friend_id, user: { id } },
    });
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
    id: number
  ): Promise<Friend> {
    const { friend_id, friend_name } = createFriend;
    const friend: Friend = await this.friendRepository.findOne({
      where: {
        friend_id,
        user: { id },
      },
    });
    if (friend) {
      friend.friend_name = friend_name;
      return await this.friendRepository.save(friend);
    } else {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`해당하는 친구가 없습니다.`],
        error: "Forbidden",
      });
    }
  }
}
