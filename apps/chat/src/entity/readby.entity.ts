import { Chatting } from "./chatting.entity";
import { User } from "@app/authentication/entity/users.entity";

export interface ReadBy {
  id: number;
  chatting: Chatting;
  user: User;
}
