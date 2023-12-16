import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { UpdateUserRequest } from "@app/common/dto";
import { User } from "../../../authentication/src/entity/users.entity";
import {AUTHENTICATION_SERVICE} from "../../../authentication/src/authentication.metadata";
import {AuthenticationService} from "../../../authentication/src/providers/authenticationservice.interface";

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
