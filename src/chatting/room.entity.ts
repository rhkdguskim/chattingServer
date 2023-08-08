import { Entity, Column, PrimaryGeneratedColumn, OneToMany , CreateDateColumn, UpdateDateColumn, Unique, Generated } from 'typeorm';
import { Participant } from './participant.entity';
import { Chatting } from './chatting.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  owner_id!: string;

  @Column()
  @Unique(['identifier']) // identifier 필드를 고유하게 만듦
  @Generated('uuid')
  identifier!: string;

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