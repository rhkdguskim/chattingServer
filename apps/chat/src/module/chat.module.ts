import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "@app/common/module";
import { ChatControllerImpl } from "../controller/chat.controller";
import { RoomControllerImpl } from "../controller/room.controller";
import { ChatServiceModule } from "@app/chat/module/chat.service.module";

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ChatServiceModule],
  controllers: [ChatControllerImpl, RoomControllerImpl],
  providers: [Logger],
})
export class ChatModule {}
