import { ClientTCP, TcpClientOptions } from "@nestjs/microservices";
import { ChattingListRequest, ChattingResponse } from "../dto/chat.dto";
import { FIND_CHATTLING_ALL } from "../chat.message";
import { lastValueFrom } from "rxjs";
import {ChatService} from "./chat.service.interface";

export class ChatTCPClientService implements ChatService {
  private readonly clientAdaptor : ClientTCP;
  constructor(options: TcpClientOptions["options"]) {
    this.clientAdaptor = new ClientTCP(options)
  }

  GetChattingList(payload: ChattingListRequest): Promise<ChattingResponse[]> {
    return lastValueFrom<ChattingResponse[]>(
      this.send<ChattingResponse[]>({ cmd: FIND_CHATTLING_ALL }, payload)
    );
  }
}
