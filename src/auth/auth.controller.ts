import { Body, Controller, Get, Post, UseGuards, Request, Put } from '@nestjs/common';
import { User } from '../users/users.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginUserDto } from '../users/dto/users.loginuser.dto';
import { CreateUserDto } from '../users/dto/users.createuser.dto'
import { UpdateUserDto } from 'src/users/dto/users.updateuser.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        ) {}

    @Post('login')
    signIn(@Body() loginUser: LoginUserDto) {
        return this.authService.signIn(loginUser);
    }

    @Post('signup')
    async createUser(@Body() user:CreateUserDto): Promise<User> {
        return await this.authService.create(user)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user
    }

    @UseGuards(AuthGuard)
    @Put('')
    async updateUser(@Body() user:UpdateUserDto): Promise<User> {
        return await this.authService.saveUser(user);
    }
}
