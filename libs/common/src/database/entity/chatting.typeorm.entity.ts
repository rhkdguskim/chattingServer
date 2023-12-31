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
import { RoomTypeORM } from "@lib/common/database/entity/room.typeorm.entity";
import { UserTypeORM } from "@lib/common/database/entity/users.typeorm.entity";
import { ReadByTypeORM } from "@lib/common/database/entity/readby.typeorm.entity";
import { ChatEntity } from "@app/chat/entity/chatting.entity";

@Entity({ name: "chat" })
export class ChattingTypeORM implements ChatEntity {
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

  @OneToMany(() => ReadByTypeORM, (readBy) => readBy.chatting, {
    eager: false,
    cascade: true,
  })
  readBys: ReadByTypeORM[];
}
