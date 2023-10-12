import { Controller, Get } from "@nestjs/common";
import { FriendService } from "./friend.service";
import { MessagePattern } from "@nestjs/microservices";
import {
  ADD_FRIEND,
  DELETE_FRIEND, FIND_ALL_FRIEND,
  UPDATE_FRIEND,
} from "@app/common/message/friend";
import {
  CreateFriendRequest,
  CreateFriendResponse,
  DelteFriendRequest, FindFriendAllRequest,
} from "@app/common/dto/friend.createfriend.dto";
import { Friend } from "@app/common/entity";

@Controller()
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @MessagePattern({cmd : FIND_ALL_FRIEND})
  async findAllFriend(payload : FindFriendAllRequest) {
    return this.friendService.getFriends(payload.id)
  }

  @MessagePattern({ cmd: ADD_FRIEND })
  async addFriend(
    payload: CreateFriendRequest,
  ): Promise<CreateFriendResponse> {
    return await this.friendService.addFriend(payload, payload.id);
  }

  @MessagePattern({ cmd: UPDATE_FRIEND })
  async updateFriend(
    payload: CreateFriendRequest
  ): Promise<Friend> {
    return await this.friendService.changeFriendName(payload, payload.id);
  }

  @MessagePattern({ cmd: DELETE_FRIEND })
  async deleteFriend(payload: DelteFriendRequest) {
    return await this.friendService.delFriend(payload, payload.id);
  }
}
