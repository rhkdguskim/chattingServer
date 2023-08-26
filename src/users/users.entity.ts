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
import { Friend } from "src/friend/friend.entity";
import { Chatting } from "src/chatting/chatting.entity";
import { Participant } from "src/chatting/participant.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  status_msg!: string;

  @Column({ nullable: true })
  profile_img_url!: string;

  @Column({ nullable: true })
  background_img_url!: string;

  @BeforeInsert()
  private beforeInsert() {
    this.password = bsrypt.hashSync(this.password, 10);
  }

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  @OneToMany((type) => Friend, (friend) => friend.user, { eager: false })
  friends: Friend[];

  @OneToMany((type) => Chatting, (chatting) => chatting.user, { eager: false })
  chatting: Chatting[];

  @OneToMany((type) => Participant, (participant) => participant.user, {
    eager: false,
  })
  participant: Participant[];

  @Column({ nullable: true })
  refreshToken!: string;

  @Column({ nullable: true })
  accessToken!: string;

  @Column({ nullable: true })
  oauth_refreshToken!: string;

  @Column({ nullable: true })
  oauth_accessToken!: string;

  @Column({ type: "timestamp", nullable: true })
  refreshTokenExpiry!: Date;
}
