import { Module } from '@nestjs/common';
import { FriendService } from './friend.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './friend.entity';

@Module({
    imports : [
        TypeOrmModule.forFeature([Friend]),],
  providers: [FriendService],
  exports: [FriendService],
})
export class FriendModule {}
