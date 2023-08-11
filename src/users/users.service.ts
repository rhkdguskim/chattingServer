import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/users.createuser.dto';
import { UpdateUserDto } from './dto/users.updateuser.dto'
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userReposity: Repository<User>,
    ) {}

    findAll(): Promise<User[]> { // Read
        return this.userReposity.find();
    }

    findOne(id: number): Promise<User | null> { // ReadOne
        return this.userReposity.findOneBy({id});
    }

    findbyUserId(user_id: string): Promise<User | null> {
        return this.userReposity.findOneBy({user_id});
    }

    async saveUser(user: UpdateUserDto): Promise<User> {
        return await this.userReposity.save(user);
    }

    async createUser(userDto: CreateUserDto): Promise<User> {
        const newUser = await this.userReposity.create(userDto);
        return await this.userReposity.save(newUser);
      }

    async remove(id: number): Promise<DeleteResult> {
        return await this.userReposity.delete(id);
    }

    async updateUser(id: number, updateData: Partial<User>) {
        return await this.userReposity.update(id, updateData);
    }

}
