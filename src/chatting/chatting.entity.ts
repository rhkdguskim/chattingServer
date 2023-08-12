import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { Room } from './room.entity';
import { User } from 'src/users/users.entity';
import { ReadBy } from './readby.entity';

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
  @JoinColumn({ name: 'room_id' })
  room!: Room;

  @ManyToOne(() => User, user => user.chattings, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(type => ReadBy, readBy => readBy.chatting, { eager: false })
  readBys: ReadBy[];
}