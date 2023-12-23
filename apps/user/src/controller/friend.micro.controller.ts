import { Controller, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import {
  ADD_FRIEND,
  DELETE_FRIEND,
  FIND_ALL_FRIEND,
  UPDATE_FRIEND,
} from "../user.message";
import { FriendService } from "../providers/friend.service.interface";
import { FriendController } from "./friend.controller.interface";
import {
  CreateFriendRequest,
  CreateFriendResponse,
  DeleteFriendRequest,
  UpdateFriendRequest,
} from "../dto/friend.dto";
import { FRIEND_SERVICE } from "@app/user/user.metadata";
import { UserInfoResponse } from "@app/user/dto/user.dto";

@Controller()
export class FriendMicroController implements FriendController {
  constructor(
    @Inject(FRIEND_SERVICE)
    private readonly friendService: FriendService
  ) {}

  @MessagePattern({ cmd: FIND_ALL_FRIEND })
  FindAllFriends(id: number): Promise<UserInfoResponse[]> {
    return this.friendService.getFriends(id);
  }

  @MessagePattern({ cmd: ADD_FRIEND })
  AddFriend(
    id: number,
    createFriend: CreateFriendRequest
  ): Promise<CreateFriendResponse> {
    return this.friendService.addFriend(id, createFriend);
  }

  @MessagePattern({ cmd: UPDATE_FRIEND })
  updateFriend(id: number, payload: UpdateFriendRequest): Promise<boolean> {
    return this.friendService.changeFriendName(id, payload);
  }

  @MessagePattern({ cmd: DELETE_FRIEND })
  async deleteFriend(
    id: number,
    payload: DeleteFriendRequest
  ): Promise<boolean> {
    return await this.friendService.delFriend(id, payload);
  }
}
