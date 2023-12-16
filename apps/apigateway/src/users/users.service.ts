import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";

import { User } from "@app/authentication/entity/users.entity";
import {AUTHENTICATION_SERVICE} from "@app/authentication/authentication.metadata";
import {AuthenticationService} from "@app/authentication/providers/authentication.service.interface";
import {UpdateUserRequest} from "@app/authentication/dto/authenticaion.dto";

@Injectable()
export class UsersService {
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private readonly userClient: AuthenticationService
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
