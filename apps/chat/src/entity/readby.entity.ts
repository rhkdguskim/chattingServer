import { ChatEntity } from "./chatting.entity";
import { UserEntity } from "@app/user/entity/users.entity";

export class ReadByEntity {
  id: number;
  chatting: ChatEntity;
  user: UserEntity;
}
