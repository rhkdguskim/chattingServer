import { ChattingListRequest, ChattingResponse } from "@app/common/dto/chat";
import { IChatClient } from "../chat.interface.client";

export class ChatLocalClient implements IChatClient {
    GetChattingList(payload: ChattingListRequest): Promise<ChattingResponse[]> {
        throw new Error("Method not implemented.");
    }

}