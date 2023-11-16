import { Chatting } from "./chatting.entity";
import { User } from "./users.entity";

export interface ReadBy {
  id: number;
  chatting: Chatting;
  user: User;
}
