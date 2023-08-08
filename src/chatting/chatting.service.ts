import { Injectable } from '@nestjs/common';
import { Chatting } from './chatting.entity';
import { Room } from './room.entity';
import { Participant } from './participant.entity';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoom } from './dto/chatting.createRoom.dto';
import { User } from 'src/users/users.entity';
import { InviteToRoom } from './dto/chatting.inviteToRoom.dto';

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
    
    async createRoom(createRoom : CreateRoom, user : User) :Promise<Room> {
        const {type, identifier} = createRoom
        const findRoom = await this.roomRepository.findOne({where : {
            identifier
        }});

        if (findRoom) { // 방이 존재하는 경우
            return findRoom
        } else { // 방이 존재하지않는경우 방을 새로 생성

            const room = await this.roomRepository.create({owner_id:user.user_id, type, identifier, last_chat:''}) // 채팅방을 생성한다.
            return await this.roomRepository.save(room);
        } 

    }

    async inviteToRoom(inviteToRoom : InviteToRoom) : Promise<Room> {
        const participants : Participant[] = []
        const room : Room = await this.roomRepository.findOne({where : {
            identifier : inviteToRoom.identifier
        }})

        if (inviteToRoom.participants) {
            inviteToRoom.participants.forEach( async (user) => {
                const newparticipant = this.participantRepository.create( {
                    user,
                    room,
                    room_name:inviteToRoom.room_name,
                    not_read_chat:0,
                })
                const result = await this.participantRepository.save(newparticipant);
                participants.push(result)
            })
        }
        participants.forEach(person => {
            room.participants.push(person)
        })
        const result = await this.roomRepository.save(room);
        return result
    }

    // 자기자신이 참가한 채팅방 Participant와 Room와 Join 하여 결과 출력
    async getRoomList( user: User ): Promise<Participant[]> {
        const rommInfo = this.participantRepository
        .createQueryBuilder('participant')
        .where({user})
        .innerJoinAndSelect('participant.room', 'room')
        .getMany();
        return rommInfo;
    }
}
