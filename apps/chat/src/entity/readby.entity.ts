import { Chatting } from "./chatting.entity";
import { UserEntity } from "@app/authentication/entity/users.entity";

export interface ReadBy {
  id: number;
  chatting: Chatting;
  user: UserEntity;
}
