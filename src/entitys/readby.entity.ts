import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Chatting } from "@src/entitys/chatting.entity";
import { User } from "@src/entitys/users.entity";

@Entity()
export class ReadBy {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Chatting, (chatting) => chatting.readBys)
  @JoinColumn({ name: "chatting_id" })
  chatting: Chatting;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
}
