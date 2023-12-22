import {
  CreateFriendRequest,
  CreateFriendResponse,
  DeleteFriendRequest,
  UpdateFriendRequest,
} from "../dto/friend.dto";
import { UserInfoResponse } from "@app/authentication/dto/authenticaion.dto";

export interface FriendService {
  getFriends(user_id: number): Promise<UserInfoResponse[]>;
  addFriend(
    user_id: number,
    createFriend: CreateFriendRequest
  ): Promise<CreateFriendResponse>;

  delFriend(user_id: number, delFriend: DeleteFriendRequest): Promise<boolean>;

  changeFriendName(
    user_id: number,
    createFriend: UpdateFriendRequest
  ): Promise<boolean>;
}
