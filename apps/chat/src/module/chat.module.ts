import { Logger, Module } from "@nestjs/common";
import { ChatControllerImpl } from "../controller/chat.controller";
import { RoomControllerImpl } from "../controller/room.controller";
import { ChatServiceModule } from "@app/chat/module/chat.service.module";
import { CHAT_GATEWAY } from "@app/chat/chat.metadata";
import { ChatGatewayImpl } from "@app/chat/gateway/chat.ㅎatewayImpl";

@Module({
  imports: [ChatServiceModule],
  controllers: [ChatControllerImpl, RoomControllerImpl],
  providers: [
    Logger,
    {
      provide: CHAT_GATEWAY,
      useClass: ChatGatewayImpl,
    },
  ],
  exports: [CHAT_GATEWAY],
})
export class ChatModule {}
