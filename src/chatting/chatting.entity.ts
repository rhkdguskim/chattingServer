import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Room } from './room.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class Chatting {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @Column()
  not_read!: number;
  
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  @ManyToOne(() => Room, room => room.chattings)
  room!: Room;

  @ManyToOne(() => User, user => user.chattings)
  user: User;
}