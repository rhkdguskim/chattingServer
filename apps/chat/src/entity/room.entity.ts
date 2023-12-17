import { Chatting } from "./chatting.entity";
import { Participant } from "./participant.entity";

export interface Room {
  id: number;
  owner_id: number;
  type: number;
  last_chat: string;
  createdAt: Date;
  updatedAt: Date;
  participant: Participant[];
  chatting: Chatting[];
}
