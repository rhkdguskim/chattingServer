import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FriendService } from './friend.service';
import { Friend } from './friend.entity';
import { User } from 'src/users/users.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('friend')
@UseGuards(AuthGuard())
export class FriendController {
    constructor(private friendService : FriendService) {

    }

    @Get('')
    @ApiOperation({ summary: '친구 추가 API', description: '친구 목록을 가져온다.' })
    @ApiCreatedResponse({ description: '사용자가 등록한 등록된 친구 목록을 가져옵니다.'})
    async FindAll(@GetUser() user: User) : Promise<Friend[]> {
        return this.friendService.getFriends(user);
    }

}
