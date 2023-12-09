import { Logger, Module } from "@nestjs/common";
import { FriendService } from "@src/friend/friend.service";
import { FriendController } from "@src/friend/friend.controller";
import { FriendServiceMoudle } from "apps/friend/src/friend.service.module";

@Module({
  imports: [FriendServiceMoudle.forRoot({isDev : false, isGlobal : false})],
  providers: [Logger],
  exports: [],
  controllers: [FriendController],
})
export class FriendModule {}
