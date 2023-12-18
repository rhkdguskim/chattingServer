import {ChattingListRequest, ChattingResponse, RequestMessage} from "../dto/chat.dto";
import {UserTypeORM} from "@app/common/typeorm/entity/users.typeorm.entity";
import {RoomTypeORM} from "@app/common/typeorm/entity/room.typeorm.entity";
import {ChattingTypeORM} from "@app/common/typeorm/entity/chatting.typeorm.entity";
import {Chatting} from "@app/chat/entity/chatting.entity";
import {UserEntity} from "@app/authentication/entity/users.entity";
import {Room} from "@app/chat/entity/room.entity";

export interface ChatService {
    createChatting(
        requestMessage: RequestMessage,
        user: UserEntity,
        room: Room
    ): Promise<Chatting>;

    findChattingById(id: number): Promise<Chatting>;

    findChattingByRoomID(id: number): Promise<Chatting[]>;

    updateChatting(chat: Chatting): Promise<boolean>;

    readChatting(
        user: UserEntity,
        room: Room
    ): Promise<Chatting[]>;

    getChattingList(payload: ChattingListRequest): Promise<ChattingResponse[]>;
}