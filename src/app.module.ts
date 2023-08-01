import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { FriendModule } from './friend/friend.module';
import { Friend } from './friend/friend.entity';
import * as config from 'config'
import { ChattingModule } from './chatting/chatting.module'
import { UsersModule } from './users/users.module';
import { Chatting } from './chatting/chatting.entity';
import { Room } from './chatting/room.entity';
import { Participant } from './chatting/participant.entity';

const dbConfig = config.get('db')
@Module({
  imports: [
    AuthModule,
    UsersModule,
    FriendModule,
    ChattingModule,
  TypeOrmModule.forRoot({
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [User, Friend, Chatting, Room, Participant],
    synchronize: dbConfig.synchronize,
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
