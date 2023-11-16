import { Logger, Module } from "@nestjs/common";
import { RoomController } from "./room.controller";
import { RoomService } from "./room.service";
import { DatabaseModule } from "@app/common/module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParticipantTypeORM, RoomTypeORM } from "@app/common/typeorm/entity";

@Module({
  imports: [DatabaseModule(), TypeOrmModule.forFeature([RoomTypeORM, ParticipantTypeORM])],
  controllers: [RoomController],
  providers: [RoomService, Logger],
})
export class RoomModule {}
