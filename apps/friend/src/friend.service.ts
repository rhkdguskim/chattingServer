import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FriendTypeORM } from "@app/common/entity/typeorm";
import { DeleteResult, Repository } from "typeorm";
import {
  CreateFriendRequest,
  CreateFriendResponse,
  DelteFriendRequest,
} from "@app/common/dto/friend.createfriend.dto";

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(FriendTypeORM)
    private friendRepository: Repository<FriendTypeORM>
  ) {}

  async getFriends(id: number): Promise<FriendTypeORM[]> {
    return await this.friendRepository.find({
      where: { user: { id } },
    });
  }

  async getMyFriends(id: number): Promise<FriendTypeORM[]> {
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
    const friends: FriendTypeORM[] = await this.getMyFriends(id);
    friends.map((myfriend: FriendTypeORM) => {
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
  ): Promise<FriendTypeORM> {
    const { friend_id, friend_name } = createFriend;
    const friend: FriendTypeORM = await this.friendRepository.findOne({
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
