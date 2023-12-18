import {Room} from "@app/chat/entity/room.entity";
import {Repository} from "@app/common/interface/repository.interface";
import {ParticipantTypeORM} from "@app/common/typeorm/entity/participant.typeorm.entity";
import {CreateRoomReqeust, CreateRoomResponse, InviteRoomRequest, RoomListResponse} from "@app/chat/dto/room.dto";
import {RoomTypeORM} from "@app/common/typeorm/entity/room.typeorm.entity";

export interface RoomRepository extends Repository<Room> {
    findOne(id : number) : Promise<Room>
}

export interface RoomTransactionRepository {
    getRoomByID(id : number) : Promise<Room>;

    updateRoom(room : Room) : Promise<boolean>;

    getParticipantByUserID(id: number): Promise<ParticipantTypeORM[]>;

    getParticipantByRoomID(id: number): Promise<ParticipantTypeORM[]>;

    getUserRoom(user_id: number): Promise<Array<RoomListResponse>>;

    inviteRoom(inviteToRoomDto: InviteRoomRequest): Promise<ParticipantTypeORM[]>;

    createRoom(createRoomDto: CreateRoomReqeust): Promise<CreateRoomResponse>;

    countParticipantsByRoomID(id : number) : Promise<number>;
}