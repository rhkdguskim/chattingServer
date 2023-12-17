import { Room } from "./room.entity";
import { User } from "@app/authentication/entity/users.entity";
import { ReadBy } from "./readby.entity";

export interface Chatting {
  id: number;
  message: string;
  messageType: number;
  not_read_chat: number;
  createdAt: Date;
  updatedAt: Date;
  room: Room;
  user: User;
  readBys: ReadBy[];
}
