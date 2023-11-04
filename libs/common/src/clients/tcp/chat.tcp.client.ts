import { ClientTCP, TcpClientOptions } from "@nestjs/microservices";
import { IChatClient } from "../chat.interface.client";
import { ChattingListRequest, ChattingResponse } from "@app/common/dto/chat";
import { FIND_CHATTLING_ALL } from "@app/common/message/chat";
import { lastValueFrom } from "rxjs";

export class ChatTCPClient extends ClientTCP implements IChatClient {
  constructor(options: TcpClientOptions["options"]) {
    super(options);
  }

  GetChattingList(payload: ChattingListRequest): Promise<ChattingResponse[]> {
    return lastValueFrom<ChattingResponse[]>(
      this.send<ChattingResponse[]>({ cmd: FIND_CHATTLING_ALL }, payload)
    );
  }
}
