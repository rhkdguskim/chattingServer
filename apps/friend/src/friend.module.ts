import {Logger, Module} from '@nestjs/common';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import {DatabaseModule} from "@app/common/module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Friend} from "@app/common/entity";

@Module({
  imports: [DatabaseModule(), TypeOrmModule.forFeature([Friend])],
  controllers: [FriendController],
  providers: [FriendService, Logger],
})
export class FriendModule {}
