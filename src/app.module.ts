import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@src/users/users.entity";
import { AuthModule } from "@src/auth/auth.module";
import { FriendModule } from "@src/friend/friend.module";
import { Friend } from "@src/friend/friend.entity";
import * as config from "config";
import { ChattingModule } from "@src/chatting/chatting.module";
import { UsersModule } from "@src/users/users.module";
import { Chatting } from "@src/chatting/chatting.entity";
import { Room } from "@src/chatting/room.entity";
import { Participant } from "@src/chatting/participant.entity";
import { FileModule } from "@src/file/file.module";
import { ReadBy } from "@src/chatting/readby.entity";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

import { OpenaiModule } from '@src/openai/openai.module';

import { DatabaseModule } from "./database.module";
import { CacheRedisModule } from "./cacheRedis.module";


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
