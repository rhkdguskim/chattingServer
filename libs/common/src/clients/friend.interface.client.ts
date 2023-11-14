import { UserResponse } from "../dto";
import {
  FindFriendAllRequest,
  CreateFriendRequest,
  CreateFriendResponse,
  DelteFriendRequest,
} from "../dto/friend.createfriend.dto";
import { FriendTypeORM } from "../entity/typeorm";

export interface IFriendClient {
  findAllFriend(payload: FindFriendAllRequest): Promise<UserResponse[]>;
  addFriend(payload: CreateFriendRequest): Promise<CreateFriendResponse>;
  updateFriend(payload: CreateFriendRequest): Promise<FriendTypeORM>;
  deleteFriend(payload: DelteFriendRequest): Promise<any>;
}
