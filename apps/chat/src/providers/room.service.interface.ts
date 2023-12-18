import {CreateRoomReqeust, CreateRoomResponse, InviteRoomRequest, RoomListResponse} from "../dto/room.dto";
import {Room} from "@app/chat/entity/room.entity";
import {Participant} from "@app/chat/entity/participant.entity";

export interface RoomService {
    createRoom(
        createRoomDto: CreateRoomReqeust
    ): Promise<CreateRoomResponse>;

    InviteRoom(
        inviteToRoom: InviteRoomRequest
    ): Promise<Participant[]>;

    GetUserRooms(user_id: number): Promise<Array<RoomListResponse>>;

    getRoombyID(id: number): Promise<Room>;

    getParticipaintsByUserID(id: number) : Promise<Participant[]>

    updateRoomStatus(room: Room): Promise<boolean>;
}