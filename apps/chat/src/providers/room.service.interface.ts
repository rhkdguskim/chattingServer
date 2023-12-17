import {CreateRoomReqeust, CreateRoomResponse, InviteRoomRequest, RoomListResponse} from "../dto/room.dto";
import {RoomTypeORM} from "@app/common/typeorm/entity/room.typeorm.entity";
import {ParticipantTypeORM} from "@app/common/typeorm/entity/participant.typeorm.entity";
import {UserTypeORM} from "@app/authentication/entity/users.typeorm.entity";

export interface RoomService {
    createRoom(
        createRoomDto: CreateRoomReqeust
    ): Promise<CreateRoomResponse>;

    InviteRoom(
        inviteToRoom: InviteRoomRequest
    ): Promise<ParticipantTypeORM[]>;

    GetUserRooms(user_id: number): Promise<Array<RoomListResponse>>;

    getRoombyID(id: number): Promise<RoomTypeORM | undefined>;

    updateRoomStatus(room: RoomTypeORM): Promise<RoomTypeORM>;
}