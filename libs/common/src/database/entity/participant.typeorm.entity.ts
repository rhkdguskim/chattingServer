import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { RoomTypeORM } from "@lib/common/database/entity/room.typeorm.entity";
import { UserTypeORM } from "@lib/common/database/entity/users.typeorm.entity";
import { ParticipantEntity } from "@app/chat/entity/participant.entity";

// 유저와 방의 Join Table
@Entity({ name: "participant" })
export class ParticipantTypeORM implements ParticipantEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => RoomTypeORM, (room) => room.participants, {
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
