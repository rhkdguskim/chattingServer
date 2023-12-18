import {Repository} from "@app/common/interface/repository.interface";
import {FriendEntity} from "../entity/friend.entity";
import {FindFriendRequest} from "../dto/friend.dto";

export interface FriendRepository extends Repository<FriendEntity> {
    findFriendById(payload: FindFriendRequest): Promise<FriendEntity>;

    getMyFriends(id: number): Promise<FriendEntity[]>;
}