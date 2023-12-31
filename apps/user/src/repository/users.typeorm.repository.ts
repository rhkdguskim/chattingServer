import { Injectable, UseFilters } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { UserEntity } from "@app/user/entity/users.entity";
import { TypeormRepository } from "@lib/common/database/typeorm.repository";
import { UserRepository } from "./users.interface.repository";
import { UserTypeORM } from "@lib/common/database/entity/users.typeorm.entity";
import { ExceptionFilterDatabase } from "@lib/common/exception/server.exception.filter";

@Injectable()
@UseFilters(ExceptionFilterDatabase)
export class UserTypeORMRepository
  extends TypeormRepository<UserTypeORM>
  implements UserRepository
{
  constructor(
    @InjectRepository(UserTypeORM)
    private userRepository: Repository<UserTypeORM>
  ) {
    super(userRepository);
  }

  public async create(data: DeepPartial<UserTypeORM>): Promise<UserTypeORM> {
    return await super.create(data);
  }

  public async findAll(): Promise<UserTypeORM[]> {
    return await super.findAll();
  }

  public async findOneByUserID(user_id: string): Promise<UserTypeORM> {
    return await this.userRepository.findOneBy({ user_id });
  }

  public async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id });
  }
}
