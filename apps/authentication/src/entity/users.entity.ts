import { FriendEntity } from "@app/friend/entity/friend.entity";

export enum Role {
  ADMIN = 0,
  USER = 1,
}

export class UserEntity {
  constructor(user: UserEntity) {
    this.id = user.id;
    this.user_id = user.user_id;
    this.password = user.password;
    this.name = user.name;
    this.status_msg = user.status_msg;
    this.profile_img_url = user.profile_img_url;
    this.role = user.role;
    if (user.friends) {
      this.friends = user.friends.map((friend) => {
        return new FriendEntity(friend);
      });
    } else {
      this.friends = [];
    }
  }
  id: number;
  user_id: string;
  password: string;
  name: string;
  status_msg: string;
  profile_img_url: string;
  background_img_url: string;
  role: Role;
  friends: FriendEntity[];
}
