import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserTypeORM } from "@app/common/typeorm/entity";
import { Repository} from "typeorm";
import {User} from "../entity/users.entity";
import {TypeormRepository} from "@app/common/typeorm/typeormrepository";
import {UserRepository} from "./users.interface.repository";

@Injectable()
export class UserTypeORMRepository extends TypeormRepository<UserTypeORM> implements UserRepository {
  constructor(
    @InjectRepository(UserTypeORM)
    private userRepository: Repository<UserTypeORM>
  ) {
    super(userRepository)
  }

  findOneByID(user_id: string): Promise<User> {
    return this.userRepository.findOneBy({ user_id });
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
}
