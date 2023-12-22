import { Logger, Module } from "@nestjs/common";
import { ChatModule } from "@app/chat/module/chat.module";

@Module({
  imports: [ChatModule],
  controllers: [],
  providers: [Logger],
})
export class ChattingModule {}
