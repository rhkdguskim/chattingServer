import { RoomEntity } from "./room.entity";
import { UserEntity } from "@app/authentication/entity/users.entity";

export class ParticipantEntity {
  constructor(participant: ParticipantEntity) {
    if (participant) {
      this.id = participant.id;
      this.room_name = participant.room_name;
      this.room = new RoomEntity(participant.room);
      this.user = new UserEntity(participant.user);
      this.createdAt = participant.createdAt;
      this.updateAt = participant.updateAt;
    }
  }
  id: number;
  room: RoomEntity;
  user: UserEntity;
  room_name: string;
  createdAt: Date;
  updateAt: Date;
}
