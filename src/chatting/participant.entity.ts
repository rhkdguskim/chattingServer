import { Entity, Column, PrimaryGeneratedColumn, ManyToOne , CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  room_id!: number;

  @Column()
  room_name!: string;

  @Column()
  not_read_chat!: number;

  @Column()
  last_read_chat_id!: number;
  
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}