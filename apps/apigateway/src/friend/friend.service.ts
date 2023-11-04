import { Inject, Injectable } from "@nestjs/common";
import { Friend } from "@app/common/entity";
import { DeleteResult } from "typeorm";
import {
  CreateFriendRequest,
  CreateFriendResponse,
  DelteFriendRequest,
  FindFriendAllRequest,
} from "@app/common/dto/friend.createfriend.dto";
import { FRIEND_SERVICE } from "@app/common/message/friend";
import { UserResponse } from "@app/common/dto";
import { IFriendClient } from "@app/common/clients/friend.interface.client";

@Injectable()
export class FriendService {
  constructor(@Inject(FRIEND_SERVICE) private friendClient: IFriendClient) {}

  async getFriends(id: number): Promise<UserResponse[]> {
    const request: FindFriendAllRequest = {
      id,
    };
    return await this.friendClient.findAllFriend(request);
  }

  async addFriend(
    createFriend: CreateFriendRequest
  ): Promise<CreateFriendResponse> {
    return await this.friendClient.addFriend(createFriend);
  }

  async delFriend(delFriend: DelteFriendRequest): Promise<DeleteResult> {
    return await this.friendClient.deleteFriend(delFriend);
  }

  async changeFriendName(updateFriend: CreateFriendRequest): Promise<Friend> {
    return await this.friendClient.updateFriend(updateFriend);
  }
}
