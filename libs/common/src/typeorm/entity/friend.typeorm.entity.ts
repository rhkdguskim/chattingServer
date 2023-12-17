import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { UserTypeORM } from "../../../../../apps/authentication/src/entity/users.typeorm.entity";
import { Friend } from "../../../../../apps/friend/src/entity/friend.entity";

@Entity({ name: "Friend" })
export class FriendTypeORM implements Friend {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  friend_id!: number;

  @Column()
  friend_name!: string;

  @ManyToOne(() => UserTypeORM)
  @JoinColumn({ name: "user_id" })
  user!: UserTypeORM;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}
