import { Logger, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/users.entity";
import { AuthModule } from "./auth/auth.module";
import { FriendModule } from "./friend/friend.module";
import { Friend } from "./friend/friend.entity";
import * as config from "config";
import { ChattingModule } from "./chatting/chatting.module";
import { UsersModule } from "./users/users.module";
import { Chatting } from "./chatting/chatting.entity";
import { Room } from "./chatting/room.entity";
import { Participant } from "./chatting/participant.entity";
import { FileModule } from "./file/file.module";
import { ReadBy } from "./chatting/readby.entity";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { CacheModule } from "@nestjs/cache-manager";
const redisStore = require("cache-manager-redis-store").redisStore;

const dbConfig = config.get("db");
const redisConfig = config.get("redis");

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), "build"),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), "uploads"),
    }),
    TypeOrmModule.forRoot({
      type: dbConfig.type,
      host: process.env.DB_HOST || dbConfig.host,
      port: parseInt(process.env.PORT) || dbConfig.port,
      username: process.env.DB_USER || dbConfig.username,
      password: process.env.DB_PASSWORD || dbConfig.password,
      database: dbConfig.database,
      // logging: true,
      entities: [User, Friend, Chatting, Room, Participant, ReadBy],
      synchronize: dbConfig.synchronize,
    }),
    CacheModule.register({
        store: redisStore,
        host: process.env.REDIS_HOST || redisConfig.host,
        port: process.env.REDIS_PORT || redisConfig.port,
        ttl:15,
        isGlobal:true,
    }),
    AuthModule,
    UsersModule,
    FriendModule,
    ChattingModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
