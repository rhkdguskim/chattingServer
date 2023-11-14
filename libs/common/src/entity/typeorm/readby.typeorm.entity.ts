import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { ChattingTypeORM } from "@app/common/entity/typeorm/chatting.typeorm.entity";
import { UserTypeORM } from "@app/common/entity/typeorm/users.typeorm.entity";
import { ReadBy } from "../interface/readby.entity";

@Entity()
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
