import { Room } from "./room.entity";
import { User } from "../../../../apps/authentication/src/entity/users.entity";

export interface Participant {
  id: number;
  room: Room;
  user: User;
  room_name: string;
  createdAt: Date;
  updateAt: Date;
}
