import { Room } from "./room.entity";
import { UserEntity } from "@app/authentication/entity/users.entity";

export interface Participant {
  id: number;
  room: Room;
  user: UserEntity;
  room_name: string;
  createdAt: Date;
  updateAt: Date;
}
