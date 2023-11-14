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
import { RoomTypeORM } from "@app/common/entity/typeorm/room.typeorm.entity";
import { UserTypeORM } from "@app/common/entity/typeorm/users.typeorm.entity";
import { ReadByTypeORM } from "@app/common/entity/typeorm/readby.typeorm.entity";
import { Chatting } from "../interface/chatting.entity";

@Entity()
export class ChattingTypeORM implements Chatting {
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

  @ManyToOne(() => RoomTypeORM, (room) => room.chatting, { nullable: false })
  @JoinColumn({ name: "room_id" })
  room!: RoomTypeORM;

  @ManyToOne(() => UserTypeORM, (user) => user.chatting, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "user_id" })
  user: UserTypeORM;

  @OneToMany((type) => ReadByTypeORM, (readBy) => readBy.chatting, {
    eager: false,
    cascade: true,
  })
  readBys: ReadByTypeORM[];
}
