import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserTypeORM } from "@app/common/typeorm/entity";
import { DeleteResult, Repository } from "typeorm";
import { UserRepository } from "apps/authentication/src/authentication.interface";
import { User } from "@app/common/entity/users.entity";

@Injectable()
export class UserTypeORMRepository implements UserRepository {
  constructor(
    @InjectRepository(UserTypeORM)
    private userReposity: Repository<UserTypeORM>
  ) {}

  findOneByID(user_id: string): Promise<User> {
    return this.userReposity.findOneBy({ user_id });
  }
  create(data: Partial<User>): Promise<User> {
    return this.userReposity.save(data);
  }
  findAll(): Promise<User[]> {
    return this.userReposity.find();
  }
  findOne(id: number): Promise<User> {
    return this.userReposity.findOneBy({ id });
  }

  async update(id: string | number, data: Partial<User>): Promise<boolean> {
    const result = await this.userReposity.update(id, data);
    return result.affected >= 1;
  }
  async delete(id: string | number): Promise<boolean> {
    const result: DeleteResult = await this.userReposity.delete(id);
    return result.affected >= 1;
  }
}
