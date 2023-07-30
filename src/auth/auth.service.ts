import { ForbiddenException, Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';
import { DeleteResult } from 'typeorm';
import { CreateUserDto } from '../users/dto/users.createuser.dto';
import { UpdateUserDto } from '../users/dto/users.updateuser.dto'
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from '../users/dto/users.loginuser.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService : UsersService,
        private jwtService : JwtService
        ) {}

    async signIn(loginUser: LoginUserDto): Promise<any> {
        const user = await this.userService.findbyUserId(loginUser.user_id);
    
        if (!user) {
            throw new UnauthorizedException();
        }
        
        const isPasswordValid = await bcrypt.compare(loginUser.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException();
        }
    
        const payload = { user_id: user.user_id, name: user.name };
    
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }

    async create(createUserDto: CreateUserDto) : Promise<any> {
        const isExist = await this.userService.findbyUserId(createUserDto.user_id)
        if (isExist) {
            throw new ForbiddenException({
                statusCode: HttpStatus.FORBIDDEN,
                message: [`이미 등록된 사용자입니다.`],
                error: 'Forbidden'
            })
        }

        return this.userService.createUser(createUserDto)
    }

    async saveUser(user: UpdateUserDto): Promise<User> {
        return await this.userService.saveUser(user);
    }

    async remove(id: number): Promise<DeleteResult> {
        return await this.userService.remove(id);
    }
}
