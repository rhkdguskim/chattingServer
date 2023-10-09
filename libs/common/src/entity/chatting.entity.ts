import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Room } from "@app/common/entity/room.entity";
import { User } from "@app/common/entity/users.entity";
import { ReadBy } from "@app/common/entity/readby.entity";

@Entity()
export class Chatting {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @Column()
  messageType!: number;

  @Column()
  not_read_chat!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Room, (room) => room.chatting, { nullable: false })
  @JoinColumn({ name: "room_id" })
  room!: Room;

  @ManyToOne(() => User, (user) => user.chatting, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany((type) => ReadBy, (readBy) => readBy.chatting, {
    eager: false,
    cascade: true,
  })
  readBys: ReadBy[];
}
