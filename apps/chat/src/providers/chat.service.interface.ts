import {ChattingListRequest, ChattingResponse, RequestMessage} from "../dto/chat.dto";
import {UserTypeORM} from "@app/common/typeorm/entity/users.typeorm.entity";
import {RoomTypeORM} from "@app/common/typeorm/entity/room.typeorm.entity";
import {ChattingTypeORM} from "@app/common/typeorm/entity/chatting.typeorm.entity";
import {ChatEntity} from "@app/chat/entity/chatting.entity";
import {UserEntity} from "@app/authentication/entity/users.entity";
import {RoomEntity} from "@app/chat/entity/room.entity";

export interface ChatService {
    createChatting(
        requestMessage: RequestMessage,
        user: UserEntity,
        room: RoomEntity
    ): Promise<ChatEntity>;

    findChattingById(id: number): Promise<ChatEntity>;

    findChattingByRoomID(id: number): Promise<ChatEntity[]>;

    updateChatting(chat: ChatEntity): Promise<boolean>;

    readChatting(
        user: UserEntity,
        room: RoomEntity
    ): Promise<ChatEntity[]>;

    getChattingList(payload: ChattingListRequest): Promise<ChattingResponse[]>;
}