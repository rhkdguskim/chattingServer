import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert , CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as bsrypt from 'bcrypt'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column({nullable: true})
  status_msg!: string;

  @Column({nullable: true})
  profile_img_url!: string;

  @Column({nullable: true})
  background_img_url!: string;

  @BeforeInsert() 
  private beforeInsert() {
    this.password = bsrypt.hashSync(this.password, 10)
  }
  
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

}