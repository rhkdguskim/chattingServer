import { Controller, Get, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import {
  ADD_FRIEND,
  DELETE_FRIEND,
  FIND_ALL_FRIEND,
  FRIEND_SERVICE,
  UPDATE_FRIEND,
} from "../friend.message";
import { Friend } from "../entity/friend.entity";
import {FriendService} from "../providers/friend.service.interface";
import {FriendController} from "./friend.controller.interface";
import {CreateFriendRequest, CreateFriendResponse, DelteFriendRequest, FindFriendAllRequest} from "../dto/friend.dto";

@Controller()
export class FriendMicroserviceController implements FriendController {
  
  constructor(
    @Inject(FRIEND_SERVICE)
    private readonly friendService: FriendService) {}

  @MessagePattern({ cmd: FIND_ALL_FRIEND })
    FindAllFriends(id: number): Promise<Friend[]> {
    return this.friendService.getFriends(id);
    }

  @MessagePattern({ cmd: ADD_FRIEND })
    AddFriend(createFriend: CreateFriendRequest): Promise<CreateFriendResponse> {
    return this.friendService.addFriend(createFriend);
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
