import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { AUTHENTICATION_SERVICE, AuthenticationClient } from "apps/authentication/src/authentication.interface";
import { UpdateUserRequest } from "@app/common/dto";
import { User } from "@app/common/entity/users.entity";

@Injectable()
export class UsersService {
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private readonly userClient: AuthenticationClient
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userClient.findAll();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userClient.findOne(id);
  }

  async findbyUserId(user_id: string): Promise<User | null> {
    return await this.userClient.findOneByID(user_id);
  }

  async remove(id: number): Promise<any> {
    return await this.userClient.delete(id);
  }

  async updateUser(updateData: UpdateUserRequest) {
    return await this.userClient.update(updateData);
  }
}
