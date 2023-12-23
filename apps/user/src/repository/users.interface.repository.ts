import { Repository } from "@app/common/interface/repository.interface";
import { UserEntity } from "@app/user/entity/users.entity";

export interface UserRepository extends Repository<UserEntity> {
  findOneByUserID(id: string): Promise<UserEntity>;
  findOne(id: number): Promise<UserEntity>;
}
