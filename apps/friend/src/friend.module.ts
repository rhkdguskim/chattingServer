import { Logger, Module } from "@nestjs/common";
import { FriendController } from "./friend.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "@app/common/module";
import { FriendServiceModule } from "./friend.service.module";

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), FriendServiceModule.forRoot({isDev : false, isGlobal : false})],
  controllers: [FriendController],
  providers: [Logger],
})
export class FriendModule {}
