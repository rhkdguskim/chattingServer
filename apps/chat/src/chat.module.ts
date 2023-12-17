import { Logger, Module } from "@nestjs/common";
import { ChatLocalService } from "./providers/chat.local.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatGateway } from "./gateway/chat.gateway";
import { typeOrmConfig } from "@app/common/module";
import { ChattingTypeORM } from "@app/common/typeorm/entity/chatting.typeorm.entity";
import {ParticipantTypeORM} from "@app/common/typeorm/entity/participant.typeorm.entity";
import {RoomTypeORM} from "@app/common/typeorm/entity/room.typeorm.entity";
import {ReadByTypeORM} from "@app/common/typeorm/entity/readby.typeorm.entity";
import {ChatHttpController} from "./controller/chat.http.controller";
import {RoomHttpController} from "./controller/room.http.controller";
import {RoomLocalService} from "./providers/room.local.service";
import {
  CHAT_REPOSITORY,
  CHAT_SERVICE,
  PARTICIPANT_REPOSITORY,
  PARTICIPANT_SERVICE,
  ROOM_REPOSITORY,
  ROOM_SERVICE
} from "./chat.metadata";
import {ChatTypeormRepository} from "@app/chat/repository/chat.typeorm.repository";
import {RoomTypeormRepository} from "@app/chat/repository/room.typeorm.repository";
import {ParticipantTypeormRepository} from "@app/chat/repository/participant.typeorm.repository";
import {ParticipantLocalService} from "@app/chat/providers/participant.local.service";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([ChattingTypeORM, ParticipantTypeORM, RoomTypeORM, ReadByTypeORM]),
  ],
  providers: [
    {
      provide : CHAT_REPOSITORY,
      useClass : ChatTypeormRepository,
    },
    {
      provide : ROOM_REPOSITORY,
      useClass : RoomTypeormRepository,
    },
    {
      provide : PARTICIPANT_REPOSITORY,
      useClass : ParticipantTypeormRepository,
    },
    {
      provide : PARTICIPANT_SERVICE,
      useClass : ParticipantLocalService,
    },
    {
      provide : CHAT_SERVICE,
      useClass : ChatLocalService
    },
    {
      provide : ROOM_SERVICE,
      useClass : RoomLocalService
    },
    ChatGateway, Logger],
  controllers: [ChatHttpController, RoomHttpController],
})
export class ChatModule {}
