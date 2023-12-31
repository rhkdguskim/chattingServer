import { Controller } from "@nestjs/common";
import { RoomServiceImpl } from "../providers/room.service";
import { ApiTags } from "@nestjs/swagger";
import {
  CreateRoomRequest,
  CreateRoomResponse,
  InviteRoomRequest,
  RoomInfoResponse,
} from "../dto/room.dto";
import { MessagePattern } from "@nestjs/microservices";
import {
  CREATE_ROOM,
  FIND_ALL_ROOM,
  FIND_ROOM,
  INVITE_ROOM,
  UPDATE_ROOM,
} from "../room.message";
import { RoomTypeORM } from "@app/common/database/entity/room.typeorm.entity";
import { RoomEntity } from "@app/chat/entity/room.entity";
import { ParticipantEntity } from "@app/chat/entity/participant.entity";

@Controller("room")
@ApiTags("채팅방")
export class RoomMicroController {
  constructor(private roomService: RoomServiceImpl) {}

  @MessagePattern({ cmd: FIND_ALL_ROOM })
  GetRoomList(payload: number): Promise<Array<RoomInfoResponse>> {
    return this.roomService.GetUserRooms(payload);
  }

  @MessagePattern({ cmd: FIND_ROOM })
  findRoom(payload: number): Promise<RoomEntity> {
    return this.roomService.getRoomByID(payload);
  }

  @MessagePattern({ cmd: UPDATE_ROOM })
  updateRoom(payload: RoomTypeORM) {
    return this.roomService.updateRoomStatus(payload);
  }

  @MessagePattern({ cmd: CREATE_ROOM })
  CreateRoom(
    user_id: number,
    payload: CreateRoomRequest
  ): Promise<CreateRoomResponse> {
    return this.roomService.createRoom(user_id, payload);
  }
  @MessagePattern({ cmd: INVITE_ROOM })
  InviteRoom(payload: InviteRoomRequest): Promise<ParticipantEntity[]> {
    return this.roomService.InviteRoom(payload);
  }
}
