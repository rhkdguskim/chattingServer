import { Logger, Module } from "@nestjs/common";
import { ChatModule } from "../../../chat/src/chat.module";

@Module({
  imports: [ChatModule],
  controllers: [],
  providers: [Logger],
})
export class ChattingModule {}
