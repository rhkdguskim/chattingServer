import { RoomEntity } from "./room.entity";
import { UserEntity } from "@app/authentication/entity/users.entity";
import { ReadByEntity } from "./readby.entity";

export class ChatEntity {
  constructor(chat : ChatEntity) {
    this.id = chat.id
    this.message = chat.message
    this.messageType = chat.messageType
    this.not_read_chat = chat.not_read_chat
    this.createdAt = chat.createdAt
    this.updatedAt = chat.updatedAt
    this.room = chat.room
    this.user = chat.user
    this.readBys = chat.readBys
  }
  id: number;
  message: string;
  messageType: number;
  not_read_chat: number;
  createdAt: Date;
  updatedAt: Date;
  room: RoomEntity;
  user: UserEntity;
  readBys: ReadByEntity[];
}
