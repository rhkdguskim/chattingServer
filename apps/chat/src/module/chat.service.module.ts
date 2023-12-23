import { Module } from "@nestjs/common";
import { ChatServiceImpl } from "../providers/chat.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatGatewayImpl } from "../gateway/chat.gateway";
import { ChattingTypeORM } from "@app/common/typeorm/entity/chatting.typeorm.entity";
import { ParticipantTypeORM } from "@app/common/typeorm/entity/participant.typeorm.entity";
import { RoomTypeORM } from "@app/common/typeorm/entity/room.typeorm.entity";
import { ReadByTypeORM } from "@app/common/typeorm/entity/readby.typeorm.entity";
import { RoomServiceImpl } from "../providers/room.service";
import {
  CHAT_GATEWAY,
  CHAT_REPOSITORY,
  CHAT_SERVICE,
  ROOM_REPOSITORY,
  ROOM_SERVICE,
} from "../chat.metadata";
import { ChatTypeormRepository } from "@app/chat/repository/chat.typeorm.repository";
import { RoomTypeormRepository } from "@app/chat/repository/room.typeorm.transaction";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChattingTypeORM,
      ParticipantTypeORM,
      RoomTypeORM,
      ReadByTypeORM,
    ]),
  ],
  providers: [
    {
      provide: CHAT_REPOSITORY,
      useClass: ChatTypeormRepository,
    },
    {
      provide: ROOM_REPOSITORY,
      useClass: RoomTypeormRepository,
    },
    {
      provide: CHAT_SERVICE,
      useClass: ChatServiceImpl,
    },
    {
      provide: ROOM_SERVICE,
      useClass: RoomServiceImpl,
    },
    {
      provide: CHAT_GATEWAY,
      useClass: ChatGatewayImpl,
    },
  ],
  exports: [
    CHAT_REPOSITORY,
    ROOM_REPOSITORY,
    CHAT_SERVICE,
    ROOM_SERVICE,
    CHAT_GATEWAY,
  ],
})
export class ChatServiceModule {}
