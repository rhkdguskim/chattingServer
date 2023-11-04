import { Logger, Module } from "@nestjs/common";
import { FriendService } from "@src/friend/friend.service";
import { FriendController } from "@src/friend/friend.controller";

@Module({
  imports: [],
  providers: [FriendService, Logger],
  exports: [FriendService],
  controllers: [FriendController],
})
export class FriendModule {}
