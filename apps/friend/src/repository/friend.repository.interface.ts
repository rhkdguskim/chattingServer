import {Repository} from "@app/common/interface/repository.interface";
import {Friend} from "../entity/friend.entity";
import {FindFriendRequest} from "../dto/friend.dto";

export interface FriendRepository extends Repository<Friend> {
    findFirendById(payload: FindFriendRequest): Promise<Friend>;

    getMyFriends(id: number): Promise<Friend[]>;
}