export class FriendUserInfo {
  constructor(user?: FriendUserInfo) {
    if (user) {
      this.id = user.id;
    }
  }
  id: number;
}

export class FriendEntity {
  constructor(friend?: FriendEntity) {
    if (friend) {
      this.id = friend.id;
      this.friend_id = friend.friend_id;
      this.friend_name = friend.friend_name;
      this.createdAt = friend.createdAt;
      this.updateAt = friend.updateAt;

      if (friend.user) {
        this.user = new FriendUserInfo(friend.user);
      }
    }
  }
  id: number;
  friend_id: number;
  friend_name: string;
  createdAt: Date;
  updateAt: Date;
  user: FriendUserInfo;
}
