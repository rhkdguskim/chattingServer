import { Module } from "@nestjs/common";
import { AuthModule } from "@src/auth/auth.module";
import { UsersModule } from "@src/user/user.module";
import { ChattingModule } from "@src/chat/chatting.module";
import { FileModule } from "@src/file/file.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheRedisModule } from "@src/util/cacheRedis.module";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";
import { typeOrmConfig } from "@app/common/typeorm/typeorm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig as DataSourceOptions),
    AuthModule,
    UsersModule,
    ChattingModule,
    FileModule,
    CacheRedisModule,
  ],
})
export class AppModule {}
