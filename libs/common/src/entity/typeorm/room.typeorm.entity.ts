import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  Generated,
} from "typeorm";
import { ParticipantTypeORM } from "@app/common/entity/typeorm/participant.typeorm.entity";
import { ChattingTypeORM } from "@app/common/entity/typeorm/chatting.typeorm.entity";
import { Room } from "../interface/room.entity";

@Entity()
export class RoomTypeORM implements Room {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  owner_id!: number;

  @Column()
  type!: number;

  @Column()
  last_chat!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany((type) => ParticipantTypeORM, (participant) => participant.room, {
    eager: true,
    cascade: true,
  })
  participant: ParticipantTypeORM[]; // 관련된 참가자들을 eager 로딩하고, 채팅방이 저장될 때 함께 저장(cascade)

  @OneToMany((type) => ChattingTypeORM, (chatting) => chatting.room, { eager: false })
  chatting: ChattingTypeORM[];
}
