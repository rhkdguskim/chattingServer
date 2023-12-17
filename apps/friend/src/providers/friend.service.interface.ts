import {Friend} from "@app/common/entity/friend.entity";
import {CreateFriendRequest, CreateFriendResponse, DelteFriendRequest} from "@app/common/dto/friend.createfriend.dto";

export interface FriendService {
    getFriends(id: number): Promise<Friend[]>;

    getMyFriends(id: number): Promise<Friend[]>;

    addFriend(createFriend: CreateFriendRequest): Promise<CreateFriendResponse>

    delFriend(delFriend: DelteFriendRequest): Promise<any>

    changeFriendName(createFriend: CreateFriendRequest): Promise<Friend>
}