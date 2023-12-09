import { Controller, Get, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import {
  ADD_FRIEND,
  DELETE_FRIEND,
  FIND_ALL_FRIEND,
  FRIEND_SERVICE,
  UPDATE_FRIEND,
} from "@app/common/message/friend";
import {
  CreateFriendRequest,
  CreateFriendResponse,
  DelteFriendRequest,
  FindFriendAllRequest,
} from "@app/common/dto/friend.createfriend.dto";
import { FriendService } from "./friend.interface";
import { Friend } from "@app/common/entity/friend.entity";

@Controller()
export class FriendController {
  
  constructor(
    @Inject(FRIEND_SERVICE)
    private readonly friendService: FriendService) {}

  @MessagePattern({ cmd: FIND_ALL_FRIEND })
  async findAllFriend(payload: FindFriendAllRequest) {
    return this.friendService.getFriends(payload.id);
  }

  @MessagePattern({ cmd: ADD_FRIEND })
  async addFriend(payload: CreateFriendRequest): Promise<CreateFriendResponse> {
    return await this.friendService.addFriend(payload);
  }

  @MessagePattern({ cmd: UPDATE_FRIEND })
  async updateFriend(payload: CreateFriendRequest): Promise<Friend> {
    return await this.friendService.changeFriendName(payload);
  }

  @MessagePattern({ cmd: DELETE_FRIEND })
  async deleteFriend(payload: DelteFriendRequest) {
    return await this.friendService.delFriend(payload);
  }
}
