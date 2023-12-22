import {
  CreateFriendRequest,
  CreateFriendResponse,
  DeleteFriendRequest,
  UpdateFriendRequest,
} from "../dto/friend.dto";
import { UserInfoResponse } from "@app/authentication/dto/authenticaion.dto";

export interface FriendController {
  FindAllFriends(id: number): Promise<UserInfoResponse[]>;

  AddFriend(
    id: number,
    createFriend: CreateFriendRequest
  ): Promise<CreateFriendResponse>;

  updateFriend(id: number, payload: UpdateFriendRequest): Promise<boolean>;

  deleteFriend(id: number, payload: DeleteFriendRequest): Promise<boolean>;
}
