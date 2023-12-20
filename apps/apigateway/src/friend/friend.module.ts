import { Logger, Module } from "@nestjs/common";
import { FriendControllerImpl } from "@app/friend/controller/friend.controller";
import { FriendServiceModule } from "../../../friend/src/module/friend.service.module";

@Module({
  imports: [FriendServiceModule.forRoot({ isDev: false, isGlobal: false })],
  providers: [Logger],
  exports: [],
  controllers: [FriendControllerImpl],
})
export class FriendModule {}
