import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { FriendModule } from './friend/friend.module';
import { Friend } from './friend/friend.entity';
import * as config from 'config'

const dbConfig = config.get('db')
@Module({
  imports: [AuthModule, 
  TypeOrmModule.forRoot({
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [User, Friend],
    synchronize: dbConfig.synchronize,
  }),
  FriendModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
