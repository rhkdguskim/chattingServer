import {Repository} from "@app/common/interface/repository.interface";
import {Chatting} from "@app/chat/entity/chatting.entity";
import {ChattingListRequest} from "@app/chat/dto/chat.dto";
import {ChattingTypeORM} from "@app/common/typeorm/entity/chatting.typeorm.entity";

export interface ChatRepository extends Repository<Chatting> {
    findChattingById(id : number) : Promise<Chatting>
    findChattingByRoomId(id : number) : Promise<Chatting[]>
    readChatting(user_id : number, room_id : number) : Promise<Chatting[]>
    getChattingList(chatListRequest : ChattingListRequest) : Promise<Chatting[]>
}