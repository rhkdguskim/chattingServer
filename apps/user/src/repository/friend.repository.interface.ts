import { Repository } from "@app/common/database/typeorm.repository.interface";
import { FriendEntity } from "../entity/friend.entity";
import { FindFriendRequest } from "../dto/friend.dto";
import { UserEntity } from "@app/user/entity/users.entity";

export interface FriendRepository extends Repository<FriendEntity> {
  findFriend(findFriendRequest: FindFriendRequest): Promise<FriendEntity>;
  getFriends(user_id: number): Promise<UserEntity[]>;
}
