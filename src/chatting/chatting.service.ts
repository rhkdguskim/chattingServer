import { Injectable, ForbiddenException, HttpStatus } from '@nestjs/common';
import { Chatting } from './chatting.entity';
import { Room } from './room.entity';
import { Participant } from './participant.entity';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InviteToRoom } from './dto/chatting.inviteToRoom.dto';
import { RequestMessage } from './dto/chatting.message.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class ChattingService {
constructor(
    @InjectRepository(Chatting)
    private chattingRepository : Repository<Chatting>,
) {}
    
    async createChatting(requestMessage : RequestMessage, user : User, room : Room): Promise<Chatting> {
        const chatting = await this.chattingRepository.create({
            user,
            room,
            message:requestMessage.message,
            not_read:10
        })
        return this.chattingRepository.save(chatting);
    }

    async readChatting(user : User, room : Room): Promise<Chatting[]> {
        return await this.chattingRepository.find({where : { user,room }})
    }

}
