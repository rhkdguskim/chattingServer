import { Injectable, ForbiddenException, HttpStatus, ConflictException, BadRequestException } from '@nestjs/common';
import { Room } from './room.entity';
import { Participant } from './participant.entity';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoom } from './dto/chatting.createRoom.dto';
import { User } from 'src/users/users.entity';
import { InviteToRoom } from './dto/chatting.inviteToRoom.dto';
import { RoomType } from './dto/room.type.dto';

@Injectable()
export class RoomService {
constructor(
    @InjectRepository(Room)
    private roomRepository : Repository<Room>,
    @InjectRepository(Participant)
    private participantRepository : Repository<Participant>,

) {}
    
    async createRoom(createRoomDto: CreateRoom, user: User): Promise<Room> {
        const participantCount = createRoomDto.participants.length;
        let determinedType: RoomType;
        if (participantCount === 1) {
            determinedType = RoomType.Individual;
        } else if (participantCount === 2) {
            determinedType = RoomType.two;
        } else {
            determinedType = RoomType.Group;
        }

        await this.validateRoomCreation(createRoomDto,determinedType);
        const room = await this.createBaseRoom(determinedType, user);
        await this.addParticipantsToRoom(room, createRoomDto.participants, createRoomDto.room_name);
        return room;
    }

    private async validateRoomCreation(createRoomDto: CreateRoom,roomType: RoomType): Promise<void> {
        const {participants } = createRoomDto;

        // 개인 및 1:1 채팅방의 경우 중복 체크
        if (roomType === RoomType.Individual || roomType === RoomType.two) {
            const existingRoom = await this.findExistingRoom(participants, roomType);
            if (existingRoom) {
                throw new ConflictException('방이 이미 존재합니다.');
            }
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
    async getRoomList( user: User ): Promise<Participant[]> {
        const rommInfo = this.participantRepository
        .createQueryBuilder('participant')
        .where({user:{id:user.id}})
        .innerJoinAndSelect('participant.room', 'room')
        .getMany();
        return rommInfo;
    }

    async getRoom(id: number): Promise<Room | undefined> {
        return this.roomRepository.findOne({where : {id}});
    }

    async updateRoomStatus(room: Room): Promise<Room> {
        return this.roomRepository.save(room)
    }
}
