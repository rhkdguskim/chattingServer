import { DB_CONFIG } from "@config/config.interface";
import { UserTypeORM } from "@app/common/typeorm/entity/users.typeorm.entity";
import { FriendTypeORM } from "@app/common/typeorm/entity/friend.typeorm.entity";
import { ChattingTypeORM } from "@app/common/typeorm/entity/chatting.typeorm.entity";
import { RoomTypeORM } from "@app/common/typeorm/entity/room.typeorm.entity";
import { ParticipantTypeORM } from "@app/common/typeorm/entity/participant.typeorm.entity";
import { ReadByTypeORM } from "@app/common/typeorm/entity/readby.typeorm.entity";

export const typeOrmConfig = {
  type: DB_CONFIG.main.type,
  host: process.env.DB_HOST || DB_CONFIG.main.host,
  port: parseInt(process.env.DB_PORT) || DB_CONFIG.main.port,
  username: process.env.DB_USER || DB_CONFIG.main.username,
  password: process.env.DB_PASSWORD || DB_CONFIG.main.password,
  database: process.env.DB_NAME || DB_CONFIG.main.database,
  entities: [
    UserTypeORM,
    FriendTypeORM,
    ChattingTypeORM,
    RoomTypeORM,
    ParticipantTypeORM,
    ReadByTypeORM,
  ],
  synchronize: process.env.DB_SYNCHRONIZE || DB_CONFIG.main.synchronize,
  autoLoadEntities: true,
};
