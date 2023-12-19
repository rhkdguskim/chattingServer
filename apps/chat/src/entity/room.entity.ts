import {ChatEntity} from "./chatting.entity";
import {ParticipantEntity} from "./participant.entity";

export enum RoomType {
  INDIVIDUAL = 1,
  TWO = 2,
  GROUP = 3,
}

export class RoomEntity {
  constructor(roomInfo : RoomEntity) {
    this.id = roomInfo.id
    this.owner_id = roomInfo.owner_id
    this.room_name = roomInfo.room_name
    this.type = roomInfo.type
    this.last_chat = roomInfo.last_chat
    this.createdAt = roomInfo.createdAt
    this.updatedAt = roomInfo.updatedAt
    this.participants = roomInfo.participants.map((participant) => {
      return new ParticipantEntity(participant)
    })
    this.chatting = roomInfo.chatting.map((chat) => {
      return new ChatEntity(chat)
    })
  }
  id: number;
  owner_id: number;
  room_name : string;
  type: RoomType;
  last_chat: string;
  createdAt: Date;
  updatedAt: Date;
  participants: ParticipantEntity[];
  chatting: ChatEntity[];
}