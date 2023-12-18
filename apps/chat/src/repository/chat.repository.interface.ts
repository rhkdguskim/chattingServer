import {Repository} from "@app/common/interface/repository.interface";
import {ChatEntity} from "@app/chat/entity/chatting.entity";
import {ChattingListRequest} from "@app/chat/dto/chat.dto";
import {ChattingTypeORM} from "@app/common/typeorm/entity/chatting.typeorm.entity";

export interface ChatRepository extends Repository<ChatEntity> {
    findChattingById(id : number) : Promise<ChatEntity>
    findChattingByRoomId(id : number) : Promise<ChatEntity[]>
    readChatting(user_id : number, room_id : number) : Promise<ChatEntity[]>
    getChattingList(chatListRequest : ChattingListRequest) : Promise<ChatEntity[]>
}