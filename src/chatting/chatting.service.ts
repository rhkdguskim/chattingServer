import { Injectable } from '@nestjs/common';
import { Chatting } from './chatting.entity';
import { Room } from './room.entity';
import { Participant } from './participant.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChattingService {
constructor(
    @InjectRepository(Chatting)
    private chattingRepository : Repository<Chatting>,
    @InjectRepository(Room)
    private roomRepository : Repository<Room>,
    @InjectRepository(Participant)
    private participantRepository : Repository<Participant>,

) {}
    
}
