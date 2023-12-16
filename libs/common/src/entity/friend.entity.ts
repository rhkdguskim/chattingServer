import { User } from "../../../../apps/authentication/src/entity/users.entity";

export interface Friend {
  id: number;
  friend_id: number;
  friend_name: string;
  createdAt: Date;
  updateAt: Date;
}
