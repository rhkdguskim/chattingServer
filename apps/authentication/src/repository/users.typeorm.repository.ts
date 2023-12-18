import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {DeepPartial, DeleteResult, Repository} from "typeorm";
import {UserEntity} from "../entity/users.entity";
import {TypeormRepository} from "@app/common/typeorm/typeormrepository";
import {UserRepository} from "./users.interface.repository";
import {UserTypeORM} from "@app/common/typeorm/entity/users.typeorm.entity";

@Injectable()
export class UserTypeORMRepository extends TypeormRepository<UserEntity> implements UserRepository {
  constructor(
    @InjectRepository(UserTypeORM)
    private userRepository: Repository<UserTypeORM>
  ) {
    super(userRepository)
  }

  public async create(data: DeepPartial<UserTypeORM>): Promise<UserEntity> {
    return new UserEntity(await super.create(data));
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await super.findAll()
    return users.map(user => {
      return new UserEntity(user);
    });
  }

  public async findOneByID(user_id: string): Promise<UserEntity> {
    return new UserEntity(await this.userRepository.findOneBy({ user_id }));
  }

  public async findOne(id: number): Promise<UserEntity> {
    return new UserEntity(await this.userRepository.findOneBy({ id }));
  }
}
