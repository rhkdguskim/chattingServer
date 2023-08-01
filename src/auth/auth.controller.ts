import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../users/users.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/users.loginuser.dto';
import { CreateUserDto } from '../users/dto/users.createuser.dto'
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
}
