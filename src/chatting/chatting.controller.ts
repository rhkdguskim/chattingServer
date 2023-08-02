import { Body, Controller, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChattingService } from './chatting.service';
import { ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateRoom } from './dto/chatting.createRoom.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/users.entity';
import { Room } from './room.entity';

@Controller('chatting')

export class ChattingController {
    constructor(private chattingService : ChattingService) {}

    @Get('')
    @ApiOperation({ summary: '방 생성하기 API', description: '등록된 친구중 친구정보를 변경합니다.' })
    @ApiCreatedResponse({ description: '등록된 친구중 친구정보를 변경합니다.'})
    async ModFriend(@Body() createRoom: CreateRoom, @GetUser() user: User) : Promise<Room> {
        return this.chattingService.createRoom(createRoom)
    }
}
