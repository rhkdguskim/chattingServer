import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { ChattingTypeORM } from "./chatting.typeorm.entity";
import { UserTypeORM } from "../../../../../apps/authentication/src/entity/users.typeorm.entity";
import { ReadBy } from "../../../../../apps/chat/src/entity/readby.entity";

@Entity({ name: "Readby" })
export class ReadByTypeORM implements ReadBy {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ChattingTypeORM, (chatting) => chatting.readBys)
  @JoinColumn({ name: "chatting_id" })
  chatting: ChattingTypeORM;

  @ManyToOne(() => UserTypeORM)
  @JoinColumn({ name: "user_id" })
  user: UserTypeORM;
}
