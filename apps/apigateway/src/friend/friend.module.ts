import { Logger, Module } from "@nestjs/common";
import { FriendService } from "@src/friend/friend.service";
import { FriendController } from "@src/friend/friend.controller";
import { ClientCustomProxyModule } from "@app/common/module/clientcustomproxy.module";
import { ClientsModule, Transport } from "@nestjs/microservices";
import {
  AUTHENTICATION_HOST,
  AUTHENTICATION_PORT,
  AUTHORIZAION_HOST,
  AUTHORIZAION_PORT,
  FRIEND_HOST,
  FRIEND_PORT,
} from "@app/common/config";
import { FRIEND_SERVICE } from "@app/common/message/friend";
import { AUTHENTICATION_SERVICE } from "@app/common/message/authentication";
import { AUTHORIZATION_SERVICE } from "@app/common/message/authorization";

@Module({
  imports: [
    ClientCustomProxyModule.register({
      clients: [
        {
          name: AUTHENTICATION_SERVICE,
          config: {
            transport: Transport.TCP,
            options: { host: AUTHENTICATION_HOST, port: AUTHENTICATION_PORT },
          },
        },
        {
          name: AUTHORIZATION_SERVICE,
          config: {
            transport: Transport.TCP,
            options: { host: AUTHORIZAION_HOST, port: AUTHORIZAION_PORT },
          },
        },
        {
          name: FRIEND_SERVICE,
          config: {
            transport: Transport.TCP,
            options: { host: FRIEND_HOST, port: FRIEND_PORT },
          }
        },
      ],
    }),
  ],
  providers: [FriendService, Logger],
  exports: [FriendService],
  controllers: [FriendController],
})
export class FriendModule {}
