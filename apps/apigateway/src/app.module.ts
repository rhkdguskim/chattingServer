import { APP_FILTER } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { AuthModule } from "@src/auth/auth.module";
import { FriendModule } from "@src/friend/friend.module";
import { ChattingModule } from "@src/chatting/chatting.module";
import { UsersModule } from "@src/users/users.module";
import { FileModule } from "@src/file/file.module";
import { DatabaseModule } from "@src/util/database.module";
import { CacheRedisModule } from "@src/util/cacheRedis.module";
import {
  CHAT_HOST,
  CHAT_PORT,
  FRIEND_HOST,
  FRIEND_PORT,
  ROOM_HOST,
  ROOM_PORT,
} from "@app/common/config";
import { FRIEND_SERVICE } from "@app/common/message/friend";
import { ClientProxyFactoryCustomModule } from "@app/common/module/clientcustomproxy.module";
import { Transport } from "@nestjs/microservices";
import { ROOM_SERVICE } from "@app/common/message/room";
import { CHAT_SERVICE } from "@app/common/message/chat";
import { AuthenticationServiceModule } from "../../authentication/src/module/authentication.service.module";
import { AuthorizationServiceModule } from "apps/authorization/src/authorization.service.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "@app/common/module";

@Module({
  imports: [
    AuthenticationServiceModule.forRoot({isDev : false, isGlobal :true}), AuthorizationServiceModule.forRoot({isDev: false, isGlobal:true}),
    ClientProxyFactoryCustomModule.register({
      isGlobal: true,
      clients: [
        {
          name: ROOM_SERVICE,
          config: {
            transport: Transport.TCP,
            options: { host: ROOM_HOST, port: ROOM_PORT },
          },
        },
        {
          name: CHAT_SERVICE,
          config: {
            transport: Transport.TCP,
            options: { host: CHAT_HOST, port: CHAT_PORT },
          },
        },
      ],
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    CacheRedisModule,
    AuthModule,
    UsersModule,
    FriendModule,
    ChattingModule,
    FileModule,
  ],
  controllers: [],
})
export class AppModule {}
