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
import { CacheModule } from "@nestjs/cache-manager";
import { OpenaiModule } from '@src/openai/openai.module';
import * as redisCacheStore from "cache-manager-ioredis";

const dbConfig = config.get("db");
const redisConfig = config.get("redis");

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), "uploads"),
    }),
    TypeOrmModule.forRoot({
      type: dbConfig.type,
      host: process.env.DB_HOST || dbConfig.host,
      port: parseInt(process.env.DB_PORT) || dbConfig.port,
      username: process.env.DB_USER || dbConfig.username,
      password: process.env.DB_PASSWORD || dbConfig.password,
      database: process.env.DB_NAME || dbConfig.database,
      entities: [User, Friend, Chatting, Room, Participant, ReadBy],
      synchronize: true || dbConfig.synchronize,
    }),
    CacheModule.register({
      store: redisCacheStore,
      host: process.env.REDIS_HOST || redisConfig.host,
      port: parseInt(process.env.REDIS_PORT) || redisConfig.port,
      password: process.env.REDIS_PASSWORD || redisConfig.password,
      isGlobal: true,
      ttl: 60,
    }),
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
