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
import { Participant } from "./participant.entity";
import { Chatting } from "./chatting.entity";

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  owner_id!: string;

  @Column()
  type!: number;

  @Column()
  last_chat!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany((type) => Participant, (participant) => participant.room, {
    eager: true,
    cascade: true,
  })
  participant: Participant[]; // 관련된 참가자들을 eager 로딩하고, 채팅방이 저장될 때 함께 저장(cascade)

  @OneToMany((type) => Chatting, (chatting) => chatting.room, { eager: false })
  chatting: Chatting[];
}
