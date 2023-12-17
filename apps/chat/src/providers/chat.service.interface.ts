import {ChattingListRequest, RequestMessage} from "../dto/chat.dto";
import {UserTypeORM} from "@app/authentication/entity/users.typeorm.entity";
import {RoomTypeORM} from "@app/common/typeorm/entity/room.typeorm.entity";
import {ChattingTypeORM} from "@app/common/typeorm/entity/chatting.typeorm.entity";

export interface ChatService {
    createChatting(
        requestMessage: RequestMessage,
        user: UserTypeORM,
        room: RoomTypeORM
    ): Promise<ChattingTypeORM>;

    findChattingById(id: number): Promise<ChattingTypeORM>;

    findChattingsByRoomId(id: number): Promise<ChattingTypeORM[]>;

    updateChatting(chat: ChattingTypeORM): Promise<ChattingTypeORM>;

    readChatting(
        user: UserTypeORM,
        room: RoomTypeORM
    ): Promise<ChattingTypeORM[]>;

    getChattingList(payload: ChattingListRequest): Promise<any[]>;
}