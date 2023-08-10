import { Injectable, ForbiddenException, HttpStatus } from '@nestjs/common';
import { Room } from './room.entity';
import { Participant } from './participant.entity';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoom } from './dto/chatting.createRoom.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class RoomService {
constructor(
    @InjectRepository(Room)
    private roomRepository : Repository<Room>,
    @InjectRepository(Participant)
    private participantRepository : Repository<Participant>,

) {}
    
    async createRoom(createRoom: CreateRoom, user: User): Promise<Room> {
        const { type, participants, room_name } = createRoom;
        // 채팅방을 생성하고 저장
        const newRoom = this.roomRepository.create({
        owner_id: user.user_id,
        type,
        last_chat: '',
        });
        const room = await this.roomRepository.save(newRoom);
        // 참가자들을 생성하고 채팅방과 연결하여 저장
        for (const participantUser of participants) {
        const newParticipant = this.participantRepository.create({
            user: participantUser,
            room,
            room_name,
            not_read_chat: 0,
        });
        await this.participantRepository.save(newParticipant);
        }
        return this.roomRepository.save(room);
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

    async getRoom(id: number): Promise<Room | undefined> {
        return this.roomRepository.findOne({where : {id}});
      }
}
