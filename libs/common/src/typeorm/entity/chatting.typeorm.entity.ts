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
import { RoomTypeORM } from "@app/common/typeorm/entity/room.typeorm.entity";
import { UserTypeORM } from "@app/common/typeorm/entity/users.typeorm.entity";
import { ReadByTypeORM } from "@app/common/typeorm/entity/readby.typeorm.entity";
import { Chatting } from "../../entity/chatting.entity";

@Entity({name: "Chatting"})
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
