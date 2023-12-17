import {Friend} from "../entity/friend.entity";

import {CreateFriendRequest, CreateFriendResponse, DelteFriendRequest} from "../dto/friend.dto";

export interface FriendService {
    getFriends(id: number): Promise<Friend[]>;

    getMyFriends(id: number): Promise<Friend[]>;

    addFriend(createFriend: CreateFriendRequest): Promise<CreateFriendResponse>

    delFriend(delFriend: DelteFriendRequest): Promise<any>

    changeFriendName(createFriend: CreateFriendRequest): Promise<Friend>
}