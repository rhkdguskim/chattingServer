import { Entity, Column, PrimaryGeneratedColumn, ManyToOne , CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Chatting {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  room_id!: number;

  @Column()
  message!: string;

  @Column()
  not_read!: boolean;
  
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}