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
import { Room } from "./room.entity";
import { User } from "src/users/users.entity";
import { ReadBy } from "./readby.entity";

@Entity()
export class Chatting {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @Column()
  not_read!: number;

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

  @OneToMany((type) => ReadBy, (readBy) => readBy.chatting, { eager: false })
  readBys: ReadBy[];
}
