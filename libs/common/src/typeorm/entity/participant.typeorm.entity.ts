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
import { RoomTypeORM } from "@app/common/typeorm/entity/room.typeorm.entity";
import { UserTypeORM } from "../../../../../apps/authentication/src/entity/users.typeorm.entity";
import { Participant } from "../../entity/participant.entity";

// 유저와 방의 Join Table
@Entity({ name: "Participant" })
export class ParticipantTypeORM implements Participant {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => RoomTypeORM, (room) => room.participant, {
    eager: false,
    nullable: false,
  })
  @JoinColumn({ name: "room_id" })
  room!: RoomTypeORM;

  @ManyToOne(() => UserTypeORM, (user) => user.participant, {
    eager: false,
    nullable: false,
  })
  @JoinColumn({ name: "user_id" })
  user!: UserTypeORM;

  @Column()
  room_name!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}
