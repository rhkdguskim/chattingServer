import { Controller, Get, Post,  Param, UseGuards } from '@nestjs/common';
import { FriendService } from './friend.service';
import { Friend } from './friend.entity';
import { User } from 'src/users/users.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateFriendDto } from './dto/friend.createfriend.dto';

@Controller('friend')
@UseGuards(AuthGuard())
export class FriendController {
    constructor(private friendService : FriendService) {

    }

    @Get('')
    @ApiOperation({ summary: '친구 목록 가져오기 API', description: '친구 목록을 가져온다.' })
    @ApiCreatedResponse({ description: '사용자가 등록한 등록된 친구 목록을 가져옵니다.'})
    async FindAll(@GetUser() user: User) : Promise<Friend[]> {
        return this.friendService.getFriends(user);
    }

    @Post('add')
    @ApiOperation({ summary: '친구 추가하기 API', description: '친구를 추가합니다.' })
    @ApiCreatedResponse({ description: '새로운 친구를 추가합니다.'})
    async AddFriend(createFriend: CreateFriendDto, @GetUser() user: User) : Promise<Friend> {
        return this.friendService.addFriend(createFriend, user);
    }

    @Post('mod')
    @ApiOperation({ summary: '친구 이름 변경하기 API', description: '등록된 친구중 친구정보를 변경합니다.' })
    @ApiCreatedResponse({ description: '등록된 친구중 친구정보를 변경합니다.'})
    async ModFriend(createFriend: CreateFriendDto, @GetUser() user: User) : Promise<Friend> {
        return this.friendService.changeFriendName(createFriend, user)
    }

}
