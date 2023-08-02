import { Entity, Column, PrimaryGeneratedColumn, ManyToOne , CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/users.entity'
@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  my_id!: string;

  @Column()
  friend_id!: string;

  @Column()
  friend_name!: string;

  @ManyToOne(() => User)
  user!: User;
  
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

}