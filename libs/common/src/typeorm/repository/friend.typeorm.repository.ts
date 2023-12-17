import { Injectable } from "@nestjs/common";
import { FriendTypeORM } from "../entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Friend } from "@app/common/entity/friend.entity";
import {FindFriendRequest} from "../../../../../apps/friend/src/dto/friend.dto";
import {FriendRepository} from "../../../../../apps/friend/src/repository/friend.repository.interface";

@Injectable()
export class FriendTypeORMRepository implements FriendRepository {
  constructor(
    @InjectRepository(FriendTypeORM)
    private friendRepository: Repository<FriendTypeORM>
  ) {}
    findFirendById(payload: FindFriendRequest): Promise<Friend> {
        return this.friendRepository.findOne({where: {
          id : payload.id,
          friend_id : payload.friend_id,
        }})
    }

    getMyFriends(id: number): Promise<Friend[]> {
        return this.friendRepository.find({
          where : {
            id
          }
        })
    }

  create(data: Partial<Friend>): Promise<Friend> {
    return this.friendRepository.save(data);
  }

  findAll(): Promise<Friend[]> {
    return this.friendRepository.find();
  }
  
  findOne(id: number): Promise<Friend> {
    return this.friendRepository.findOneBy({ id });
  }

  async update(id: string | number, data: Partial<Friend>): Promise<boolean> {
    const result = await this.friendRepository.update(id, data);
    return result.affected >= 1;
  }

  async delete(id: string | number): Promise<boolean> {
    const result =  await this.friendRepository.delete(id);
    return result.affected >= 1;
  }
}