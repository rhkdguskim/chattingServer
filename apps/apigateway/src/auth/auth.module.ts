import { Module } from "@nestjs/common";
import { AuthenticationModule } from "@app/authentication/module/authentication.module";
import { AuthorizationModule } from "@app/authorization/module/authorization.module";

@Module({
  imports: [AuthenticationModule, AuthorizationModule],
  exports: [],
})
export class AuthModule {}
