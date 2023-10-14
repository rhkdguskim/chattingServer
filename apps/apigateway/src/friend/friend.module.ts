import { Logger, Module } from "@nestjs/common";
import { FriendService } from "@src/friend/friend.service";
import { FriendController } from "@src/friend/friend.controller";
import { AuthClientsModule } from "@app/common/module/authclients.module";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { FRIEND_HOST, FRIEND_PORT } from "@app/common/config";
import { FRIEND_SERVICE } from "@app/common/message/friend";

@Module({
  imports: [
    AuthClientsModule,
    ClientsModule.register([
      {
        name: FRIEND_SERVICE,
        transport: Transport.TCP,
        options: { host: FRIEND_HOST, port: FRIEND_PORT },
      },
      // 다른 서비스도 필요한 경우 추가
    ]),
  ],
  providers: [FriendService, Logger],
  exports: [FriendService],
  controllers: [FriendController],
})
export class FriendModule {}
