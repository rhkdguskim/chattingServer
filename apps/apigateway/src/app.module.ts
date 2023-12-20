import { APP_FILTER } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { AuthModule } from "@src/auth/auth.module";
import { FriendModule } from "@src/friend/friend.module";
import { ChattingModule } from "@src/chat/chatting.module";
import { FileModule } from "@src/file/file.module";
import { CacheRedisModule } from "@src/util/cacheRedis.module";
import { AuthenticationServiceModule } from "@app/authentication/module/authentication.service.module";
import { AuthorizationServiceModule } from "@app/authorization/module/authorization.service.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "@app/common/module";

@Module({
  imports: [
    AuthenticationServiceModule.forRoot(),
    AuthorizationServiceModule.forRoot({ isDev: false, isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    CacheRedisModule,
    AuthModule,
    FriendModule,
    ChattingModule,
    FileModule,
  ],
  controllers: [],
})
export class AppModule {}
