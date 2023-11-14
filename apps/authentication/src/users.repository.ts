import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserRequest, UpdateUserRequest } from "@app/common/dto";
import { UserTypeORM } from "@app/common/entity/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { OAuthRequest } from "@app/common/dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserTypeORM)
    private userReposity: Repository<UserTypeORM>
  ) {}

  async findAll(): Promise<UserTypeORM[]> {
    return await this.userReposity.find();
  }

  findOne(id: number): Promise<UserTypeORM | null> {
    return this.userReposity.findOneBy({ id });
  }

  async findbyUserId(user_id: string): Promise<UserTypeORM | null> {
    const result = await this.userReposity.findOneBy({ user_id });
    return result;
  }

  async saveUser(user: UpdateUserRequest): Promise<UserTypeORM> {
    return await this.userReposity.save(user);
  }

  async createUser(userDto: CreateUserRequest): Promise<UserTypeORM> {
    const newUser = await this.userReposity.create(userDto);
    return await this.userReposity.save(newUser);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userReposity.delete(id);
  }

  async updateUser(id: number, updateData: Partial<UserTypeORM>) {
    return await this.userReposity.update(id, updateData);
  }
}
