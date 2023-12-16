
import {
  FindFriendAllRequest,
  CreateFriendRequest,
  CreateFriendResponse,
  DelteFriendRequest,
} from "../dto/friend.createfriend.dto";
import { FriendTypeORM } from "../typeorm/entity";
import {UserResponse} from "@app/authentication/dto/authenticaion.dto";

export interface IFriendClient {
  findAllFriend(payload: FindFriendAllRequest): Promise<UserResponse[]>;
  addFriend(payload: CreateFriendRequest): Promise<CreateFriendResponse>;
  updateFriend(payload: CreateFriendRequest): Promise<FriendTypeORM>;
  deleteFriend(payload: DelteFriendRequest): Promise<any>;
}
