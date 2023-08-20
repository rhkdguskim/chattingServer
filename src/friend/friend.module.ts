import { Logger, Module } from "@nestjs/common";
import { FriendService } from "./friend.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Friend } from "./friend.entity";
import { FriendController } from "./friend.controller";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Friend]), UsersModule],
  providers: [FriendService, Logger],
  exports: [FriendService],
  controllers: [FriendController],
})
export class FriendModule {}
