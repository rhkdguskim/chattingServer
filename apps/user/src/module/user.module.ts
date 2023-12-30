import { Logger, Module } from "@nestjs/common";
import { UserServiceModule } from "./user.service.module";
import { FriendControllerImpl } from "@app/user/controller/friend.controller";
import { UsersControllerImpl } from "@app/user/controller/user.controller";

@Module({
  imports: [UserServiceModule],
  controllers: [UsersControllerImpl, FriendControllerImpl],
  providers: [Logger],
})
export class UserModule {}
