import {
  ForbiddenException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Friend } from "@app/common/entity";
import { DeleteResult, Repository } from "typeorm";
import {
  CreateFriendRequest,
  CreateFriendResponse,
  DelteFriendRequest,
  FindFriendAllRequest,
} from "@app/common/dto/friend.createfriend.dto";
import {
  ADD_FRIEND,
  DELETE_FRIEND,
  FIND_ALL_FRIEND,
  FRIEND_SERVICE,
  UPDATE_FRIEND,
} from "@app/common/message/friend";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { UserResponse } from "@app/common/dto";

@Injectable()
export class FriendService {
  constructor(@Inject(FRIEND_SERVICE) private friendClient: ClientProxy) {}

  async getFriends(id: number): Promise<UserResponse[]> {
    const request: FindFriendAllRequest = {
      id,
    };
    return await lastValueFrom(
      this.friendClient.send({ cmd: FIND_ALL_FRIEND }, request)
    );
  }

  async addFriend(
    createFriend: CreateFriendRequest
  ): Promise<CreateFriendResponse> {
    return await lastValueFrom(
      this.friendClient.send({ cmd: ADD_FRIEND }, createFriend)
    );
  }

  async delFriend(delFriend: DelteFriendRequest): Promise<DeleteResult> {
    return await lastValueFrom(
      this.friendClient.send({ cmd: DELETE_FRIEND }, delFriend)
    );
  }

  async changeFriendName(createFriend: CreateFriendRequest): Promise<Friend> {
    return await lastValueFrom(
      this.friendClient.send({ cmd: UPDATE_FRIEND }, createFriend)
    );
  }
}
