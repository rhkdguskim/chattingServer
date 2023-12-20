import {
  CreateFriendRequest,
  CreateFriendResponse,
  DeleteFriendRequest,
  UpdateFriendRequest,
} from "../dto/friend.dto";

export interface FriendController {
  FindAllFriends(id: number): Promise<CreateFriendResponse[]>;

  AddFriend(
    id: number,
    createFriend: CreateFriendRequest
  ): Promise<CreateFriendResponse>;

  updateFriend(id: number, payload: UpdateFriendRequest): Promise<boolean>;

  deleteFriend(id: number, payload: DeleteFriendRequest): Promise<boolean>;
}
