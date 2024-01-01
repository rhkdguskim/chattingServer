import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { FriendTypeORM } from "@lib/common/database/entity/friend.typeorm.entity";
import { ChattingTypeORM } from "@lib/common/database/entity/chatting.typeorm.entity";
import { ParticipantTypeORM } from "@lib/common/database/entity/participant.typeorm.entity";
import { UserEntity } from "@app/user/entity/users.entity";
import { Role } from "@lib/common/guard/authorization.role.guard";

@Entity({ name: "user" })
export class UserTypeORM implements UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  status_msg: string;

  @Column({ nullable: true })
  profile_img_url: string;

  @Column({ nullable: true })
  background_img_url: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  @OneToMany(() => FriendTypeORM, (friend) => friend.user, {
    eager: false,
    cascade: true,
    onDelete: "CASCADE",
  })
  friends: FriendTypeORM[];

  @OneToMany(() => ChattingTypeORM, (chatting) => chatting.user, {
    eager: false,
  })
  chatting: ChattingTypeORM[];

  @OneToMany(() => ParticipantTypeORM, (participant) => participant.user, {
    eager: false,
  })
  participant: ParticipantTypeORM[];

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ nullable: true })
  access_token: string;

  @Column({ nullable: true })
  oauth_refresh_token: string;

  @Column({ nullable: true })
  oauth_access_token: string;

  @Column({ type: "timestamp", nullable: true })
  refresh_token_expire: Date;

  @Column({ type: "enum", enum: Role, default: Role.USER })
  role: Role;
}
