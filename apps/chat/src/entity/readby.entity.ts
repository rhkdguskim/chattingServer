import { ChatEntity } from "./chatting.entity";
import { UserEntity } from "@app/authentication/entity/users.entity";

export class ReadByEntity {
  id: number;
  chatting: ChatEntity;
  user: UserEntity;
}
