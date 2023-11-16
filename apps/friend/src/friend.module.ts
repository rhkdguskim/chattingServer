import { Logger, Module } from "@nestjs/common";
import { FriendController } from "./friend.controller";
import { FriendService } from "./friend.service";
import { DatabaseModule } from "@app/common/module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendTypeORM } from "@app/common/typeorm/entity";

@Module({
  imports: [DatabaseModule(), TypeOrmModule.forFeature([FriendTypeORM])],
  controllers: [FriendController],
  providers: [FriendService, Logger],
})
export class FriendModule {}
