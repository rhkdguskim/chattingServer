import { Logger, Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { DatabaseModule } from "@app/common/module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChattingTypeORM, ParticipantTypeORM } from "@app/common/typeorm/entity";
import { ChatGateway } from "./chat.gateway";

@Module({
  imports: [
    DatabaseModule(),
    TypeOrmModule.forFeature([ChattingTypeORM, ParticipantTypeORM]),
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, Logger],
})
export class ChatModule {}
