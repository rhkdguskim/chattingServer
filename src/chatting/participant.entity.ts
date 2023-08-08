import { Entity, Column, PrimaryGeneratedColumn, ManyToOne , JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { Room } from './room.entity';
import { User } from 'src/users/users.entity';

// 유저와 방의 Join Table
@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Room, room => room.participants, { nullable: false })
  @JoinColumn({ name: 'roomId' })
  room!: Room;

  @ManyToOne(() => User, user => user.participants, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  room_name!: string;

  @Column()
  not_read_chat!: number;
  
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

}