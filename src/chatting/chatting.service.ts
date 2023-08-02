import { Injectable } from '@nestjs/common';
import { Chatting } from './chatting.entity';
import { Room } from './room.entity';
import { Participant } from './participant.entity';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoom } from './dto/chatting.createRoom.dto';
import { User } from 'src/users/users.entity';

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
    
    async createRoom(createRoom : CreateRoom) :Promise<Room> {
        const {my_id, type, room_name, identifier, participants} = createRoom
        const room = await this.roomRepository.create({owner_id:my_id, type, identifier, last_chat:'', room_name}) // 채팅방을 생성한다.
        console.log(room)
        await participants.forEach(person => {
            this.participantRepository.create({
                user_id:person.user_id,
            })
        })
        return room
    }

    async getRoom( user: User ): Promise<Room[]> {
        const participant = await this.participantRepository.find({where : {
            user:user
        }})
        return this.roomRepository.find({where : {
            participants:participant,
        }});
    }
}
