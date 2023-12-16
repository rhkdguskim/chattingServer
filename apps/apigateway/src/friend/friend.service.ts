import { Inject, Injectable } from "@nestjs/common";
import {
  CreateFriendRequest,
  CreateFriendResponse,
  DelteFriendRequest,
  FindFriendAllRequest,
} from "@app/common/dto/friend.createfriend.dto";
import { FRIEND_SERVICE } from "@app/common/message/friend";

import { IFriendClient } from "@app/common/clients/friend.interface.client";
import { Friend } from "@app/common/entity/friend.entity";
import {UserResponse} from "@app/authentication/dto/authenticaion.dto";

@Injectable()
export class FriendService {
  constructor(@Inject(FRIEND_SERVICE) private friendService: IFriendClient) {}

  async getFriends(id: number): Promise<UserResponse[]> {
    const request: FindFriendAllRequest = {
      id,
    };
    return await this.friendService.findAllFriend(request);
  }

  async addFriend(
    createFriend: CreateFriendRequest
  ): Promise<CreateFriendResponse> {
    return await this.friendService.addFriend(createFriend);
  }

  async delFriend(delFriend: DelteFriendRequest): Promise<boolean> {
    return await this.friendService.deleteFriend(delFriend);
  }

  async changeFriendName(
    updateFriend: CreateFriendRequest
  ): Promise<Friend> {
    return await this.friendService.updateFriend(updateFriend);
  }
}
