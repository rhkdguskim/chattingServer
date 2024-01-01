import { RoomEntity } from "./room.entity";
import { ReadByEntity } from "./readby.entity";

export class ChatUserInfo {
  id: number;
}

export class ChatEntity {
  constructor(chat: ChatEntity) {
    if (chat) {
      this.id = chat.id;
      this.message = chat.message;
      this.messageType = chat.messageType;
      this.not_read_chat = chat.not_read_chat;
      this.createdAt = chat.createdAt;
      this.updatedAt = chat.updatedAt;
      this.room = chat.room;
      this.readBys = chat.readBys;
    }
  }
  id: number;
  message: string;
  messageType: number;
  not_read_chat: number;
  createdAt: Date;
  updatedAt: Date;
  user: ChatUserInfo;
  room: RoomEntity;
  readBys: ReadByEntity[];
}
