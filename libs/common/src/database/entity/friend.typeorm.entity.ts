import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { UserTypeORM } from "@lib/common/database/entity/users.typeorm.entity";
import { FriendEntity } from "@app/user/entity/friend.entity";

@Entity({ name: "friend" })
@Unique(["user", "friend_id"])
export class FriendTypeORM implements FriendEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  friend_id!: number;

  @Column()
  friend_name!: string;

  @ManyToOne(() => UserTypeORM)
  @JoinColumn({ name: "user_id" })
  user: UserTypeORM;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}
