import { Module } from "@nestjs/common";
import { AuthModule } from "@src/auth/auth.module";
import { FriendModule } from "@src/friend/friend.module";
import { ChattingModule } from "@src/chatting/chatting.module";
import { UsersModule } from "@src/users/users.module";
import { FileModule } from "@src/file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

import { OpenaiModule } from '@src/openai/openai.module';

import { DatabaseModule } from "@src/util/database.module";
import { CacheRedisModule } from "@src/util/cacheRedis.module";


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), "uploads"),
    }),
    DatabaseModule,
    CacheRedisModule,
    AuthModule,
    UsersModule,
    FriendModule,
    ChattingModule,
    FileModule,
    OpenaiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
