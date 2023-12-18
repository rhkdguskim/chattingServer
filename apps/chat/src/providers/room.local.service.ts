import {BadRequestException, Inject, Injectable, Logger, LoggerService,} from "@nestjs/common";
import {EntityManager} from "typeorm";
import {CreateRoomReqeust, CreateRoomResponse, InviteRoomRequest, RoomListResponse, RoomType,} from "../dto/room.dto";
import {ValidateCreateRoom} from "@app/common/decoration/room.deco";
import {ParticipantTypeORM} from "@app/common/typeorm/entity/participant.typeorm.entity";
import {RoomService} from "./room.service.interface";
import { ROOM_REPOSITORY} from "@app/chat/chat.metadata";
import { RoomTransactionRepository} from "@app/chat/repository/room.repository.interface";
import {Room} from "@app/chat/entity/room.entity";
import { Participant } from "../entity/participant.entity";

@Injectable()
export class RoomLocalService implements RoomService {
    constructor(
        @Inject(EntityManager) private readonly manager: EntityManager,
        @Inject(ROOM_REPOSITORY)
        private roomRepository: RoomTransactionRepository,
        @Inject(Logger)
        private readonly logger: LoggerService
    ) {
    }

    getParticipaintsByUserID(id: number): Promise<Participant[]> {
        return this.roomRepository.getParticipantByUserID(id);
    }

    @ValidateCreateRoom()
    async createRoom(
        createRoomDto: CreateRoomReqeust
    ): Promise<CreateRoomResponse> {
        return await this.roomRepository.createRoom(createRoomDto);
    }

    async InviteRoom(
        inviteToRoom: InviteRoomRequest
    ): Promise<ParticipantTypeORM[]> {
        const results: ParticipantTypeORM[] = [];
        const {room, room_name, participants} = inviteToRoom;

        if (room.type !== RoomType.Group) {
            throw new BadRequestException(
                "Only group chat rooms can invite participants."
            );
        }

        return await this.roomRepository.inviteRoom(inviteToRoom);
    }

    async GetUserRooms(user_id: number): Promise<Array<RoomListResponse>> {
        return this.roomRepository.getUserRoom(user_id)
    }

    async getRoombyID(id: number): Promise<Room> {
        return await this.roomRepository.getRoomByID(id)
    }

    async updateRoomStatus(room: Room): Promise<boolean> {
        return await this.roomRepository.updateRoom(room);
    }
}
