import { Injectable, Inject, Logger, LoggerService } from "@nestjs/common";
import { CHAT_SERVICE, FIND_CHATTLING_ALL } from "@app/common/message/chat";
import { ClientProxy } from "@nestjs/microservices";
import { ChattingListRequest } from "@app/common/dto/chat";
import { lastValueFrom } from "rxjs";

@Injectable()
export class ChattingService {
  constructor(
    @Inject(CHAT_SERVICE)
    private readonly chatClient: ClientProxy,
    @Inject(Logger)
    private readonly logger: LoggerService
  ) {}

  async getChattingList(id: number, cursor: number): Promise<any[]> {
    const request: ChattingListRequest = {
      id,
      cursor,
    };
    return await lastValueFrom(
      this.chatClient.send({ cmd: FIND_CHATTLING_ALL }, request)
    );
  }
}
