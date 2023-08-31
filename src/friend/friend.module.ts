import { Logger, Module } from "@nestjs/common";
import { FriendService } from "@src/friend/friend.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Friend } from "@src/friend/friend.entity";
import { FriendController } from "@src/friend/friend.controller";
import { UsersModule } from "@src/users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Friend]), UsersModule],
  providers: [FriendService, Logger],
  exports: [FriendService],
  controllers: [FriendController],
})
export class FriendModule {}
