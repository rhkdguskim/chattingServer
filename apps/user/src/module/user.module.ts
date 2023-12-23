import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "@app/common/module";
import { UserServiceModule } from "./user.service.module";
import { FriendControllerImpl } from "@app/user/controller/friend.controller";
import { UsersControllerImpl } from "@app/user/controller/user.controller";

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserServiceModule],
  controllers: [UsersControllerImpl, FriendControllerImpl],
  providers: [Logger],
})
export class UserModule {}
