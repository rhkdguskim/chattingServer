import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { FriendTypeORM } from "@app/common/typeorm/entity/friend.typeorm.entity";
import { ChattingTypeORM } from "@app/common/typeorm/entity/chatting.typeorm.entity";
import { ParticipantTypeORM } from "@app/common/typeorm/entity/participant.typeorm.entity";
import {Role, UserEntity} from "@app/authentication/entity/users.entity";

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

  @OneToMany((type) => FriendTypeORM, (friend) => friend.user, { eager: false })
  friends: FriendTypeORM[];

  @OneToMany((type) => ChattingTypeORM, (chatting) => chatting.user, {
    eager: false,
  })
  chatting: ChattingTypeORM[];

  @OneToMany((type) => ParticipantTypeORM, (participant) => participant.user, {
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
