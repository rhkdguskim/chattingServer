import { ForbiddenException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Friend } from "@src/entitys/friend.entity";
import { DeleteResult, Repository } from "typeorm";
import { User } from "@src/entitys/users.entity";
import { CreateFriendRequest, CreateFriendResponse, DelteFriendRequest } from "@src/friend/dto/friend.createfriend.dto";
import { UsersService } from "@src/users/users.service";
import { UserResponse } from "@src/users/dto/users.dto";

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>,
    private userService: UsersService
  ) {}

  async getFriends(id: number): Promise<UserResponse[]> {
    const friends: Friend[] = await this.friendRepository.find({
      where: { user: { id } },
    });

    const userPromises = friends.map(async (friend) => {
      const user: User = await this.userService.findOne(friend.friend_id);
      return user;
    });

    return Promise.all(userPromises);
  }

  async getMyFriends(id: number): Promise<Friend[]> {
    return await this.friendRepository.find({
      where: { user: { id } },
    });
  }

  async addFriend(createFriend: CreateFriendRequest, id: number): Promise<CreateFriendResponse> {
    const { friend_id, friend_name } = createFriend;
    const friend = this.friendRepository.create({
      friend_id,
      friend_name,
      user : {id},
    });

    // 이미 등록된 친구라면
    const friends: Friend[] = await this.getMyFriends(id);
    friends.map((myfriend: Friend) => {
      if (myfriend.friend_id == friend_id) {
        throw new ForbiddenException({
          statusCode: HttpStatus.FORBIDDEN,
          message: [`이미 등록된 친구입니다.`],
          error: "Forbidden",
        });
      }
    });
    return await this.friendRepository.save(friend);
  }

  async delFriend(delFriend: DelteFriendRequest, id: number): Promise<DeleteResult> {
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
