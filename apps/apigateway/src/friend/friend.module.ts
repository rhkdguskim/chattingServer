import { Logger, Module } from "@nestjs/common";
import { FriendHttpController } from "../../../friend/src/controller/friend.http.controller";
import { FriendServiceModule } from "../../../friend/src/module/friend.service.module";

@Module({
  imports: [FriendServiceModule.forRoot({isDev : false, isGlobal : false})],
  providers: [Logger],
  exports: [],
  controllers: [FriendHttpController],
})
export class FriendModule {}
