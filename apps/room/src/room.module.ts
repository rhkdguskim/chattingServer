import {Logger, Module} from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import {DatabaseModule} from "@app/common/module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Participant, Room} from "@app/common/entity";

@Module({
  imports: [DatabaseModule(), TypeOrmModule.forFeature([Room, Participant])],
  controllers: [RoomController],
  providers: [RoomService, Logger],
})
export class RoomModule {}
