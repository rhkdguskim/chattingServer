import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { FriendModule } from './friend/friend.module';
import { Friend } from './friend/friend.entity';

@Module({
  imports: [AuthModule, 
    ConfigModule.forRoot( {
    load: [configuration],
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 13306,
    username: 'root',
    password: 'root',
    database: 'kakaotalk',
    entities: [User, Friend],
    synchronize: true,
  }),
  FriendModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
