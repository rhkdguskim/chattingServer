import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Friend } from './friend/friend.entity';
import { Chatting } from './chatting/chatting.entity';
import { Room } from './chatting/room.entity';
import { Participant } from './chatting/participant.entity';
import { ReadBy } from './chatting/readby.entity';
import * as config from "config";

const dbConfig = config.get("db");

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConfig.type,
      host: process.env.DB_HOST || dbConfig.host,
      port: parseInt(process.env.DB_PORT) || dbConfig.port,
      username: process.env.DB_USER || dbConfig.username,
      password: process.env.DB_PASSWORD || dbConfig.password,
      database: process.env.DB_NAME || dbConfig.database,
      entities: [User, Friend, Chatting, Room, Participant, ReadBy],
      synchronize: process.env.DB_SYNCHRONIZE || dbConfig.synchronize,
    }),
  ],
})
export class DatabaseModule {}