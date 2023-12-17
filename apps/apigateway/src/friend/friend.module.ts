import { Logger, Module } from "@nestjs/common";
import { FriendService } from "@src/friend/friend.service";
import { FriendController } from "@src/friend/friend.controller";
import { FriendServiceModule } from "../../../friend/src/module/friend.service.module";

@Module({
  imports: [FriendServiceModule.forRoot({isDev : false, isGlobal : false})],
  providers: [Logger],
  exports: [],
  controllers: [FriendController],
})
export class FriendModule {}
