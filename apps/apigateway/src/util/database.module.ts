import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTypeORM } from "@app/common/entity/typeorm";
import { FriendTypeORM } from "@app/common/entity/typeorm";
import { ChattingTypeORM } from "@app/common/entity/typeorm";
import { RoomTypeORM } from "@app/common/entity/typeorm";
import { ParticipantTypeORM } from "@app/common/entity/typeorm";
import { ReadByTypeORM } from "@app/common/entity/typeorm";
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
      entities: [UserTypeORM, FriendTypeORM, ChattingTypeORM, RoomTypeORM, ParticipantTypeORM, ReadByTypeORM],
      synchronize: process.env.DB_SYNCHRONIZE || dbConfig.synchronize,
    }),
  ],
})
export class DatabaseModule {}
