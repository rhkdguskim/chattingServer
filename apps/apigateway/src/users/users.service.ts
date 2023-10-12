import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { User} from "@app/common/entity";
import { DeleteResult } from "typeorm";
import {
  AUTHENTICATION_SERVICE, DELETE_USER,
  FIND_ALL_USER,
  FIND_ONE_BY_ID_USER,
  FIND_ONE_USER, UPDATE_USER
} from "@app/common/message/authentication";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";

@Injectable()
export class UsersService {
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private readonly userClient : ClientProxy,
  ) {}

  async findAll(): Promise<User[]> {
    return await lastValueFrom(this.userClient.send({cmd:FIND_ALL_USER}, {}))
  }

  async findOne(id: number): Promise<User | null> {
    return await lastValueFrom(this.userClient.send({cmd:FIND_ONE_USER}, id))
  }

  async findbyUserId(user_id: string): Promise<User | null> {
    return await lastValueFrom(this.userClient.send({cmd:FIND_ONE_BY_ID_USER}, user_id))
  }

  async remove(id: number): Promise<DeleteResult> {
    return await lastValueFrom(this.userClient.send({cmd:DELETE_USER}, id));
  }

  async updateUser(updateData: Partial<User>) {
    return await lastValueFrom(this.userClient.send({cmd:UPDATE_USER}, updateData));
  }
}
