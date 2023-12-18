import * as config from "config";
import {UserTypeORM} from "@app/common/typeorm/entity/users.typeorm.entity";
import {FriendTypeORM} from "@app/common/typeorm/entity/friend.typeorm.entity";
import {ChattingTypeORM} from "@app/common/typeorm/entity/chatting.typeorm.entity";
import {RoomTypeORM} from "@app/common/typeorm/entity/room.typeorm.entity";
import {ParticipantTypeORM} from "@app/common/typeorm/entity/participant.typeorm.entity";
import {ReadByTypeORM} from "@app/common/typeorm/entity/readby.typeorm.entity";
const dbConfig = config.get<any>("db");

export const typeOrmConfig = {
  type: dbConfig.type,
  host: process.env.DB_HOST || dbConfig.host,
  port: parseInt(process.env.DB_PORT) || dbConfig.port,
  username: process.env.DB_USER || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  database: process.env.DB_NAME || dbConfig.database,
  entities: [
    UserTypeORM,
    FriendTypeORM,
    ChattingTypeORM,
    RoomTypeORM,
    ParticipantTypeORM,
    ReadByTypeORM,
  ],
  synchronize: process.env.DB_SYNCHRONIZE || dbConfig.synchronize,
  autoLoadEntities: true,
};
