import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserRequest, UpdateUserRequest } from "@app/common/dto";
import { User } from "@app/common/entity";
import { DeleteResult, Repository } from "typeorm";
import { OAuthRequest } from "@app/common/dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userReposity: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userReposity.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userReposity.findOneBy({ id });
  }

  async findbyUserId(user_id: string): Promise<User | null> {
    const result = await this.userReposity.findOneBy({ user_id });
    return result;
  }

  async saveUser(user: UpdateUserRequest): Promise<User> {
    return await this.userReposity.save(user);
  }

  async createUser(userDto: CreateUserRequest): Promise<User> {
    const newUser = await this.userReposity.create(userDto);
    return await this.userReposity.save(newUser);
  }

  async createOAuthUser(data: OAuthRequest): Promise<User> {
    const newUser = await this.userReposity.create({
      ...data.user,
      oauth_accessToken: data.access_token,
      oauth_refreshToken: data.refresh_token,
    });
    return await this.userReposity.save(newUser);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userReposity.delete(id);
  }

  async updateUser(id: number, updateData: Partial<User>) {
    return await this.userReposity.update(id, updateData);
  }
}
