import { Injectable, ForbiddenException, HttpStatus, ConflictException, BadRequestException } from '@nestjs/common';
import { Room } from './room.entity';
import { Participant } from './participant.entity';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoom } from './dto/chatting.createRoom.dto';
import { User } from 'src/users/users.entity';
import { InviteToRoom } from './dto/chatting.inviteToRoom.dto';
import { RoomType } from './dto/room.type.dto';
import { Chatting } from './chatting.entity';

@Injectable()
export class RoomService {
constructor(
    @InjectRepository(Room)
    private roomRepository : Repository<Room>,
    @InjectRepository(Participant)
    private participantRepository : Repository<Participant>,
    @InjectRepository(Chatting)
    private chattingRepository : Repository<Chatting>,

) {}
    
    async createRoom(createRoomDto: CreateRoom, user: User): Promise<Room> {
        console.log(createRoomDto.participant)
        const participantCount = createRoomDto.participant.length;
        let determinedType: RoomType;
        if (participantCount === 1) {
            determinedType = RoomType.Individual;
        } else if (participantCount === 2) {
            determinedType = RoomType.two;
        } else {
            determinedType = RoomType.Group;
        }

        const alreadyRoom = await this.validateRoomCreation(createRoomDto,determinedType);
        if (alreadyRoom) {
            return alreadyRoom;
        }
        const room = await this.createBaseRoom(determinedType, user);
        await this.addParticipantsToRoom(room, createRoomDto.participant, createRoomDto.room_name);
        return room;
    }

    private async validateRoomCreation(createRoomDto: CreateRoom,roomType: RoomType): Promise<Room> {
        const {participant } = createRoomDto;

        // 개인 및 1:1 채팅방의 경우 중복 체크
        if (roomType === RoomType.Individual || roomType === RoomType.two) {
            return await this.findExistingRoom(participant, roomType);
        }
    }

    private async findExistingRoom(participants: User[], type: RoomType): Promise<Room | undefined> {
        const participantIds = participants.map(p => p.id);
        console.log
        return await this.roomRepository
            .createQueryBuilder('room')
            .innerJoin('room.participants', 'participant')
            .innerJoin('participant.user', 'user')
            .where('room.type = :type', { type })
            .andWhere('user.id IN (:...participantIds)', { participantIds })
            .getOne();
    }

    private async createBaseRoom(type: RoomType, user: User): Promise<Room> {
        const newRoom = this.roomRepository.create({
            owner_id: user.user_id,
            type,
            last_chat: '',
        });
        return await this.roomRepository.save(newRoom);
    }

    private async addParticipantsToRoom(room: Room, participants: User[], room_name: string): Promise<void> {
        for (const participantUser of participants) {
            const newParticipant = this.participantRepository.create({
                user: participantUser,
                room,
                room_name,
                not_read_chat: 0,
            });
            await this.participantRepository.save(newParticipant);
        }
    }

    async InviteRoom(inviteToRoom: InviteToRoom): Promise<Participant[]> {
        const results: Participant[] = [];
        const { room, room_name, participants } = inviteToRoom;
    
        // 해당 방이 그룹 채팅방인지 확인
        if (room.type !== RoomType.Group) {
            throw new BadRequestException('Only group chat rooms can invite participants.');
        }
    
        for (const user of participants) {
            const instance = this.participantRepository.create({
                user,
                room,
                room_name,
            });
    
            const participant = await this.participantRepository.save(instance);
            results.push(participant);
        }
    
        return results;
    }

    // 자기자신이 참가한 채팅방 Participant와 Room와 Join 하여 결과 출력
    async GetParticipants( user: User ): Promise<Participant[]> {
        const rommInfo = await this.participantRepository
        .createQueryBuilder('participant')
        .where({user:{id:user.id}})
        .innerJoinAndSelect('participant.room', 'room')
        .getMany();
        return rommInfo;
    }

    async GetRooms(user: User) : Promise<Room[]> {
        const rommInfo = await this.participantRepository
        .createQueryBuilder('participant')
        .where({user:{id:user.id}})
        .innerJoinAndSelect('participant.room', 'room')
        .getMany();
        
        const RoomList :Room[] = [] 
        ;(await rommInfo).forEach((room)=> {
            RoomList.push(room.room)
        })
        return RoomList;
    }

    async getRoom(id: number): Promise<Room | undefined> {
        return this.roomRepository.findOne({where : {id}});
    }

    async updateRoomStatus(room: Room): Promise<Room> {
        return this.roomRepository.save(room)
    }
    async getChattingList(id: number): Promise<any[]> {
        const chatList = await this.chattingRepository.createQueryBuilder('chatting')
          .where('chatting.room_id = :id', { id })
          .leftJoinAndSelect('chatting.user', 'user')
          .select(['chatting.id', 'chatting.message', 'chatting.not_read', 'chatting.createdAt', 'user.id'])
          .getRawMany();
      
        return chatList.map(chat => ({
          id: chat.chatting_id,
          message: chat.chatting_message,
          not_read: chat.chatting_not_read,
          createdAt: chat.chatting_createdAt,
          user_id: chat.user_id
        }));
      }
    
}
