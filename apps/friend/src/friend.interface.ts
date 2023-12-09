import { CreateFriendRequest, CreateFriendResponse, DelteFriendRequest } from "@app/common/dto/friend.createfriend.dto";
import { Friend } from "@app/common/entity/friend.entity";
import { Repository } from "@app/common/interface";

export const FRIEND_REPOSITORY = 'FRIEND_REPOSITORY'

export interface FindFriendRequest {
  id : number,
  friend_id : number,
}

export interface FriendService {
    getFriends(id: number): Promise<Friend[]>;
    getMyFriends(id: number): Promise<Friend[]>;
    addFriend(createFriend: CreateFriendRequest): Promise<CreateFriendResponse>
    delFriend(delFriend: DelteFriendRequest): Promise<any>
    changeFriendName(createFriend: CreateFriendRequest): Promise<Friend>
  }
  
export interface FriendRepository extends Repository<Friend> {
    findFirendById(payload : FindFriendRequest) : Promise<Friend>;
    getMyFriends(id : number) : Promise<Friend[]>;
}
