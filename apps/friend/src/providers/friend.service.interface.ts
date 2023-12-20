import { FriendEntity } from "../entity/friend.entity";

import {
  CreateFriendRequest,
  CreateFriendResponse,
  DeleteFriendRequest,
  UpdateFriendRequest,
} from "../dto/friend.dto";

export interface FriendService {
  getFriends(id: number): Promise<FriendEntity[]>;

  getMyFriends(id: number): Promise<FriendEntity[]>;

  addFriend(
    user_id: number,
    createFriend: CreateFriendRequest
  ): Promise<FriendEntity>;

  delFriend(user_id: number, delFriend: DeleteFriendRequest): Promise<boolean>;

  changeFriendName(
    user_id: number,
    createFriend: UpdateFriendRequest
  ): Promise<boolean>;
}
