import { Entity, Column, PrimaryGeneratedColumn, OneToMany , CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Participant } from './participant.entity';
import { Chatting } from './chatting.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  owner_id!: string;

  @Column()
  identifier!: string;

  @Column()
  room_name!: string;

  @Column()
  type!: number;

  @Column()
  last_chat!: string;
  
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  @OneToMany(type => Participant, participant => participant.room, { eager: true })
  participants: Participant[]

  @OneToMany(type => Chatting, chatting => chatting.room, {eager: true})
  chattings:Chatting[]
}