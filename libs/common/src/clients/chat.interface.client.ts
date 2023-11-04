import { ChattingListRequest, ChattingResponse } from "../dto/chat";

export interface IChatClient {
  GetChattingList(payload: ChattingListRequest): Promise<ChattingResponse[]>;
}
