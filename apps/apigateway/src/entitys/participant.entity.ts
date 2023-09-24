import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";
import { Room } from "@src/entitys/room.entity";
import { User } from "@src/entitys/users.entity";

// 유저와 방의 Join Table
@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Room, (room) => room.participant, {
    eager: false,
    nullable: false,
  })
  @JoinColumn({ name: "room_id" })
  room!: Room;

  @ManyToOne(() => User, (user) => user.participant, {
    eager: false,
    nullable: false,
  })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column()
  room_name!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}
