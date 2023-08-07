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
        const {type, room_name, identifier, participants} = createRoom
        const room = await this.roomRepository.create({owner_id:user.user_id, type, identifier, last_chat:'', room_name}) // 채팅방을 생성한다.
        const resultRoom = await this.roomRepository.save(room);
        const resultParticipants = []
        if (participants) {
            await participants.forEach( async (person) => {
                const participant = this.participantRepository.create({
                    user:person,
                    room:resultRoom
                })
                const resultPerson =  await this.participantRepository.save(participant)
                resultParticipants.push(resultPerson)
            })
            resultRoom.participants = resultParticipants
            const newRoom = await this.roomRepository.save(resultRoom);
            return newRoom
        }
        else {
            return resultRoom
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
                    room
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

    async getRoom( user: User ): Promise<Participant[]> {
        const participant = await this.participantRepository.find({where : {
            user:user
        }})
        return participant;
    }
}
