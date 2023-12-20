import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FriendEntity } from "../entity/friend.entity";
import { FindFriendRequest } from "../dto/friend.dto";
import { FriendRepository } from "./friend.repository.interface";
import { FriendTypeORM } from "@app/common/typeorm/entity/friend.typeorm.entity";
import { TypeormRepository } from "@app/common/typeorm/typeormrepository";
import { UserTypeORM } from "@app/common/typeorm/entity/users.typeorm.entity";
import {
  ChatServerException,
  ChatServerExceptionCode,
} from "@app/common/exception/chatServerException";

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
  async findFriendById(payload: FindFriendRequest): Promise<FriendEntity> {
    const result = await this.friendRepository.findOne({
      where: {
        user: { id: payload.user_id },
        id: payload.id,
      },
    });
    return new FriendEntity(result);
  }

  async getMyFriends(id: number): Promise<FriendEntity[]> {
    const friends = await this.friendRepository.find({
      where: {
        user: { id },
      },
    });
    return friends.map((friend) => {
      return new FriendEntity(friend);
    });
  }

  async create(data: Partial<FriendEntity>): Promise<FriendEntity> {
    return new FriendEntity(await super.create(data));
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
