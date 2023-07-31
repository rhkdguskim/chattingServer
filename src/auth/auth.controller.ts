import { Body, Controller, Get, Post, UseGuards, Request, Put } from '@nestjs/common';
import { User } from '../users/users.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
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
    @ApiOperation({ summary: '사용자 로그인 API', description: '사용자가 로그인을 한다.' })
    @ApiCreatedResponse({ description: 'JWT 토큰을 발급합니다', type: LoginUserDto })
    signIn(@Body() loginUser: LoginUserDto) {
        return this.authService.signIn(loginUser);
    }

    @Post('signup')
    @ApiOperation({ summary: '사용자 생성 API', description: '사용자를 생성한다.' })
    @ApiCreatedResponse({ description: '사용자를 생성한다.', type: User })
    async createUser(@Body() user:CreateUserDto): Promise<User> {
        return await this.authService.create(user)
    }

    @UseGuards(AuthGuard())
    @Get('profile')
    @ApiOperation({ summary: '사용자 정보 API', description: '사용자 정보를 불러옵니다.' })
    @ApiCreatedResponse({ description: 'JWT Token으로 Profile값을 리턴합니다.'})
    getProfile(@Request() req) {
        return req.user
    }

    @UseGuards(AuthGuard())
    @Put('')
    @ApiOperation({ summary: '사용자 정보 업데이트 API', description: '사용자 정보를 업데이트 합니다.' })
    @ApiCreatedResponse({ description: '사용자 정보를 업데이트 합니다.'})
    async updateUser(@Body() user:UpdateUserDto): Promise<User> {
        return await this.authService.saveUser(user);
    }
}
