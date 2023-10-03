import { Logger, Module } from "@nestjs/common";
import { FriendService } from "@src/friend/friend.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Friend } from "@src/entitys/friend.entity";
import { FriendController } from "@src/friend/friend.controller";
import { UsersModule } from "@src/users/users.module";
import {AuthClientsModule} from "@app/common/module/authclients.module";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {
  FRIEND_HOST, FRIEND_PORT
} from "@app/common/config";

@Module({
  imports: [TypeOrmModule.forFeature([Friend]), UsersModule, AuthClientsModule,
    ClientsModule.register([
      { name: 'FRIEND_SERVICE', transport: Transport.TCP, options: { host: FRIEND_HOST, port: FRIEND_PORT } },
      // 다른 서비스도 필요한 경우 추가
    ]),],
  providers: [FriendService, Logger],
  exports: [FriendService],
  controllers: [FriendController],
})
export class FriendModule {}
