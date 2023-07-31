import { Body, Controller, Get, Post, UseGuards, Request, Put } from '@nestjs/common';
import { User } from '../users/users.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginUserDto } from '../users/dto/users.loginuser.dto';
import { CreateUserDto } from '../users/dto/users.createuser.dto'
import { UpdateUserDto } from 'src/users/dto/users.updateuser.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';

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
    @ApiOperation({ summary: '사용자 생성 API', description: '사용자를 생성한다.' })
    @ApiCreatedResponse({ description: '사용자를 생성한다.', type: User })
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
