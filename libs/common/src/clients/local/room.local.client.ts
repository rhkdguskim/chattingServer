import { RoomListResponse, CreateRoomReqeust, CreateRoomResponse, InviteRoomRequest } from "@app/common/dto/room.dto";
import { RoomTypeORM, ParticipantTypeORM, UserTypeORM } from "@app/common/entity/typeorm";
import { IRoomClient } from "../room.interface.client";

export class RoomLocalClient implements IRoomClient {
    GetRoomList(payload: number): Promise<RoomListResponse[]> {
        throw new Error("Method not implemented.");
    }
    findRoom(payload: number): Promise<RoomListResponse[]> {
        throw new Error("Method not implemented.");
    }
    updateRoom(payload: RoomTypeORM): Promise<RoomTypeORM> {
        throw new Error("Method not implemented.");
    }
    CreateRoom(payload: CreateRoomReqeust): Promise<CreateRoomResponse> {
        throw new Error("Method not implemented.");
    }
    InviteRoom(payload: InviteRoomRequest): Promise<ParticipantTypeORM[]> {
        throw new Error("Method not implemented.");
    }
    findParticipant(payload: UserTypeORM): Promise<ParticipantTypeORM[]> {
        throw new Error("Method not implemented.");
    }

}