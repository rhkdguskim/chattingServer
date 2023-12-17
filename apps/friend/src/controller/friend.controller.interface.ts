import {Friend} from "../entity/friend.entity";

import {CreateFriendRequest, CreateFriendResponse, DelteFriendRequest} from "../dto/friend.dto";

export interface FriendController {
    FindAllFriends(id: number): Promise<Friend[]>;

    AddFriend(createFriend: CreateFriendRequest): Promise<CreateFriendResponse>

    updateFriend(payload: CreateFriendRequest): Promise<Friend>

    deleteFriend(payload: DelteFriendRequest) : Promise<boolean>;
}