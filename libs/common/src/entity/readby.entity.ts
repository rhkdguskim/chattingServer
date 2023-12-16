import { Chatting } from "./chatting.entity";
import { User } from "../../../../apps/authentication/src/entity/users.entity";

export interface ReadBy {
  id: number;
  chatting: Chatting;
  user: User;
}
