import { ChatEntity } from "./chatting.entity";
import { ChatUserInfo } from "@app/chat/dto/chat.dto";

export class ReadByEntity {
  id: number;
  user: ChatUserInfo;
  chatting: ChatEntity;
}
