import { Module } from '@nestjs/common';
import { FriendService } from './friend.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './friend.entity';
import { FriendController } from './friend.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports : [
        TypeOrmModule.forFeature([Friend]),
      AuthModule,
      UsersModule],
  providers: [FriendService],
  exports: [FriendService],
  controllers: [FriendController],
})
export class FriendModule {}
