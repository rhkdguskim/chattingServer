import { APP_FILTER } from '@nestjs/core';
import { Module } from "@nestjs/common";
import { AuthModule } from "@src/auth/auth.module";
import { FriendModule } from "@src/friend/friend.module";
import { ChattingModule } from "@src/chatting/chatting.module";
import { UsersModule } from "@src/users/users.module";
import { FileModule } from "@src/file/file.module";
import { DatabaseModule } from "@src/util/database.module";
import { CacheRedisModule } from "@src/util/cacheRedis.module";
import { AUTHENTICATION_SERVICE } from "@app/common/message/authentication";
import {
  AUTHENTICATION_HOST,
  AUTHENTICATION_PORT,
  AUTHORIZAION_HOST,
  AUTHORIZAION_PORT,
  CHAT_HOST,
  CHAT_PORT,
  FRIEND_HOST,
  FRIEND_PORT,
  ROOM_HOST,
  ROOM_PORT,
} from "@app/common/config";
import { AUTHORIZATION_SERVICE } from "@app/common/message/authorization";
import { FRIEND_SERVICE } from "@app/common/message/friend";
import { ClientProxyFactoryCustomModule } from "@app/common/module/clientcustomproxy.module";
import { Transport } from "@nestjs/microservices";
import { ROOM_SERVICE } from "@app/common/message/room";
import { CHAT_SERVICE } from "@app/common/message/chat";

@Module({
  imports: [
    ClientProxyFactoryCustomModule.register({
      isGlobal: true,
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
          },
        },
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
    DatabaseModule,
    CacheRedisModule,
    AuthModule,
    UsersModule,
    FriendModule,
    ChattingModule,
    FileModule,
  ],
  controllers: [],
})
export class AppModule { }
