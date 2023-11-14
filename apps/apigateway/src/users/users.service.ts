import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { UserTypeORM } from "@app/common/entity/typeorm";
import { AUTHENTICATION_SERVICE } from "@app/common/message/authentication";
import { IAuthenticationClient } from "@app/common/clients/authenication.interface.client";
import { UpdateUserRequest } from "@app/common/dto";

@Injectable()
export class UsersService {
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private readonly userClient: IAuthenticationClient
  ) {}

  async findAll(): Promise<UserTypeORM[]> {
    return await this.userClient.findAll();
  }

  async findOne(id: number): Promise<UserTypeORM | null> {
    return await this.userClient.findOne(id);
  }

  async findbyUserId(user_id: string): Promise<UserTypeORM | null> {
    return await this.userClient.findOneByID(user_id);
  }

  async remove(id: number): Promise<any> {
    return await this.userClient.delete(id);
  }

  async updateUser(updateData: UpdateUserRequest) {
    return await this.userClient.update(updateData);
  }
}
