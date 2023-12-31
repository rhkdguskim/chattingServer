import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ParticipantTypeORM } from "@lib/common/database/entity/participant.typeorm.entity";
import { ChattingTypeORM } from "./chatting.typeorm.entity";
import { RoomEntity, RoomType } from "@app/chat/entity/room.entity";

@Entity({ name: "room" })
export class RoomTypeORM implements RoomEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  owner_id!: number;

  @Column()
  room_name: string;

  @Column({
    type: "enum",
    enum: RoomType,
    default: RoomType.INDIVIDUAL,
  })
  type: RoomType;

  @Column()
  last_chat!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany((type) => ParticipantTypeORM, (participant) => participant.room, {
    eager: false,
    cascade: true,
  })
  participants: ParticipantTypeORM[];

  @OneToMany((type) => ChattingTypeORM, (chatting) => chatting.room, {
    eager: false,
  })
  chatting: ChattingTypeORM[];
}
