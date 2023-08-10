import { Body, Controller, Post, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoomService } from './room.service';
import { ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateRoom } from './dto/chatting.createRoom.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/users.entity';
import { Room } from './room.entity';
import { InviteToRoom } from './dto/chatting.inviteToRoom.dto';
import { Participant } from './participant.entity';

@Controller('chatting')
@UseGuards(AuthGuard())
export class ChattingController {
    constructor(private chattingService : RoomService) {}

    @Get('')
    @ApiOperation({ summary: '유저의 방 리스트 API', description: '유저의 방 리스트를 불러옵니다.' })
    @ApiCreatedResponse({ description: '등록된 친구중 친구정보를 변경합니다.'})
    async GetRoomList(@GetUser() user: User) : Promise<Participant[]> {
        return this.chattingService.getRoomList(user)
    }

    @Post('add')
    @ApiOperation({ summary: '방 생성하기 API', description: '등록된 친구중 친구정보를 변경합니다.' })
    @ApiCreatedResponse({ description: '등록된 친구중 친구정보를 변경합니다.'})
    async CreateRoom(@Body() createRoom: CreateRoom, @GetUser() user: User) : Promise<Room> {
        return this.chattingService.createRoom(createRoom, user)
    }
}
