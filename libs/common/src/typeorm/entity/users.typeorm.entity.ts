import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import * as bsrypt from "bcrypt";
import { FriendTypeORM } from "@app/common/typeorm/entity/friend.typeorm.entity";
import { ChattingTypeORM } from "@app/common/typeorm/entity/chatting.typeorm.entity";
import { ParticipantTypeORM } from "@app/common/typeorm/entity/participant.typeorm.entity";
import { User } from "../../entity/users.entity";

@Entity({ name: "User" })
export class UserTypeORM implements User {
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

  @BeforeInsert()
  private beforeInsert() {
    this.password = bsrypt.hashSync(this.password, 10);
  }

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
  refreshToken: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ nullable: true })
  oauth_refreshToken: string;

  @Column({ nullable: true })
  oauth_accessToken: string;

  @Column({ type: "timestamp", nullable: true })
  refreshTokenExpiry: Date;
}
