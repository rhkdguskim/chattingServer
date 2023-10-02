import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {User, Friend, Chatting, Room, Participant, ReadBy} from "@app/common/entity";
import * as config from "config";
const dbConfig = config.get("db");
export function DatabaseModule() {
  return TypeOrmModule.forRoot({
    type: dbConfig.type,
    host: process.env.DB_HOST || dbConfig.host,
    port: parseInt(process.env.DB_PORT) || dbConfig.port,
    username: process.env.DB_USER || dbConfig.username,
    password: process.env.DB_PASSWORD || dbConfig.password,
    database: process.env.DB_NAME || dbConfig.database,
    entities: [User, Friend, Chatting, Room, Participant, ReadBy],
    synchronize: process.env.DB_SYNCHRONIZE || dbConfig.synchronize,
    autoLoadEntities: true,
  });
}