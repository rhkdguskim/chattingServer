import { Logger, Module } from "@nestjs/common";
import { UserModule } from "@app/user/module/user.module";

@Module({
  imports: [UserModule],
  providers: [Logger],
  exports: [],
  controllers: [],
})
export class UsersModule {}
