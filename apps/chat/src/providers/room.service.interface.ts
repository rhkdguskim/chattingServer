import {CreateRoomReqeust, CreateRoomResponse, InviteRoomRequest, RoomListResponse} from "../dto/room.dto";
import {RoomEntity} from "@app/chat/entity/room.entity";
import {ParticipantEntity} from "@app/chat/entity/participant.entity";

export interface RoomService {
    createRoom(
        createRoomDto: CreateRoomReqeust
    ): Promise<CreateRoomResponse>;

    InviteRoom(
        inviteToRoom: InviteRoomRequest
    ): Promise<ParticipantEntity[]>;

    GetUserRooms(user_id: number): Promise<Array<RoomListResponse>>;

    getRoombyID(id: number): Promise<RoomEntity>;

    getParticipaintsByUserID(id: number) : Promise<ParticipantEntity[]>

    updateRoomStatus(room: RoomEntity): Promise<boolean>;
}