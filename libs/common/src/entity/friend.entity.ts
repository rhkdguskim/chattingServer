import { User } from "./users.entity";

export interface Friend {
  id: number;
  friend_id: number;
  friend_name: string;
  user: User;
  createdAt: Date;
  updateAt: Date;
}
