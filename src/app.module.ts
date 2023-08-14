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
import { FileModule } from './file/file.module';
import { ReadBy } from './chatting/readby.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

const dbConfig = config.get('db')
@Module({
  imports: [
    AuthModule,
    UsersModule,
    FriendModule,
    ChattingModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'build'),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'uploads'),
    }),
  TypeOrmModule.forRoot({
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    // logging: true,
    entities: [User, Friend, Chatting, Room, Participant, ReadBy],
    synchronize: dbConfig.synchronize,
  }),
  FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
