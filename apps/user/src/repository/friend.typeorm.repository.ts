import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FriendEntity } from "../entity/friend.entity";
import { FindFriendRequest } from "../dto/friend.dto";
import { FriendRepository } from "./friend.repository.interface";
import { FriendTypeORM } from "@app/common/database/entity/friend.typeorm.entity";
import { TypeormRepository } from "@app/common/database/typeorm.repository";
import { UserTypeORM } from "@app/common/database/entity/users.typeorm.entity";
import { UserEntity } from "@app/user/entity/users.entity";

@Injectable()
export class FriendTypeORMRepository
  extends TypeormRepository<FriendEntity>
  implements FriendRepository
{
  constructor(
    @InjectRepository(FriendTypeORM)
    private friendRepository: Repository<FriendTypeORM>,
    @InjectRepository(UserTypeORM)
    private readonly userRepository: Repository<UserTypeORM>
  ) {
    super(friendRepository);
  }

  async findFriend(
    findFriendRequest: FindFriendRequest
  ): Promise<FriendEntity> {
    const result = await this.friendRepository.findOneBy({
      friend_id: findFriendRequest.friend_id,
      user: { id: findFriendRequest.user_id },
    });

    if (result == null) {
      return null;
    }

    return new FriendEntity(result);
  }

  async getFriends(id: number): Promise<UserEntity[]> {
    const friends = await this.friendRepository.find({
      where: {
        user: { id },
      },
    });

    return await Promise.all(
      friends.map(async (friend) => {
        return new UserEntity(
          await this.userRepository.findOne({
            where: {
              id: friend.friend_id,
            },
          })
        );
      })
    );
  }

  async create(data: Partial<FriendEntity>): Promise<FriendEntity> {
    return new FriendEntity(await super.create(data));
  }

  async update(
    user_id: number,
    data: Partial<FriendTypeORM>
  ): Promise<boolean> {
    const { friend_id, ...newData } = data;
    return await super.update({ friend_id, user: { id: user_id } }, newData);
  }

  async findAll(): Promise<FriendEntity[]> {
    const friends = await super.findAll();
    return friends.map((friend) => {
      return new FriendEntity(friend);
    });
  }

  async findOne(id: number): Promise<FriendEntity> {
    return new FriendEntity(await this.friendRepository.findOneBy({ id }));
  }
}
