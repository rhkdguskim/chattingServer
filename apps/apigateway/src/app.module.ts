import { Module } from "@nestjs/common";
import { AuthModule } from "@src/auth/auth.module";
import { UsersModule } from "@src/user/user.module";
import { ChattingModule } from "@src/chat/chatting.module";
import { FileModule } from "@src/file/file.module";
import { CacheRedisModule } from "@src/util/cacheRedis.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "@app/common/module";
import { DevtoolsModule } from "@nestjs/devtools-integration";

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== "production",
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsersModule,
    ChattingModule,
    FileModule,
    CacheRedisModule,
  ],
})
export class AppModule {}
