import { Entity, Column, PrimaryGeneratedColumn, ManyToOne , CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Room } from './room.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  @ManyToOne(() => Room, room => room.participants)
  room!: Room;

  @ManyToOne(type => User, user => user.participants)
  user!: User;
}