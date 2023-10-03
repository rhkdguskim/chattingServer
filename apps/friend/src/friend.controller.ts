import { Controller, Get } from '@nestjs/common';
import { FriendService } from './friend.service';
import {MessagePattern} from "@nestjs/microservices";
import {ADD_FRIEND, DELETE_FRIEND, UPDATE_FRIEND} from "@app/common/message/friend";
import {CreateFriendRequest, CreateFriendResponse, DelteFriendRequest} from "@src/friend/dto/friend.createfriend.dto";
import {Friend} from "@app/common/entity";

@Controller()
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @MessagePattern({cmd: ADD_FRIEND})
  async addFriend(payload : CreateFriendRequest, id : number) :Promise<CreateFriendResponse> {
    return await this.friendService.addFriend(payload, id);
  }

  @MessagePattern({cmd:UPDATE_FRIEND})
  async updateFriend(payload : CreateFriendRequest, id : number) : Promise<Friend>{
    return await this.friendService.changeFriendName(payload, id);
  }

  @MessagePattern({cmd:DELETE_FRIEND})
  async deleteFriend(payload:DelteFriendRequest, id:number) {
    return await this.friendService.delFriend(payload, id)
  }
}
