import { UserResponse } from "../dto";
import {
  FindFriendAllRequest,
  CreateFriendRequest,
  CreateFriendResponse,
  DelteFriendRequest,
} from "../dto/friend.createfriend.dto";
import { Friend } from "../entity";

export interface IFriendClient {
  findAllFriend(payload: FindFriendAllRequest): Promise<UserResponse[]>;
  addFriend(payload: CreateFriendRequest): Promise<CreateFriendResponse>;
  updateFriend(payload: CreateFriendRequest): Promise<Friend>;
  deleteFriend(payload: DelteFriendRequest): Promise<any>;
}
