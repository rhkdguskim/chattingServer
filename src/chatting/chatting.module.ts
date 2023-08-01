import { Module } from '@nestjs/common';
import { ChattingController } from './chatting.controller';
import { ChattingService } from './chatting.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './participant.entity';
import { Chatting } from './chatting.entity';
import { Room } from './room.entity';
import { ChattingGateway } from './chatting.gateway';

@Module({
  imports : [
    TypeOrmModule.forFeature([Chatting,Room,Participant]),
  AuthModule],
  controllers: [ChattingController],
  providers: [ChattingService, ChattingGateway]
})
export class ChattingModule {}
