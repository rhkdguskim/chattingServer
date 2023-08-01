import { Entity, Column, PrimaryGeneratedColumn, ManyToOne , CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  identifier!: number;

  @Column()
  type!: number;

  @Column()
  last_chat!: string;
  
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}