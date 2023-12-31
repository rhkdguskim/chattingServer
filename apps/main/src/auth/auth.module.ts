import { Module } from "@nestjs/common";
import { AuthenticationModule } from "@app/auth/module/authentication.module";
import { AuthorizationModule } from "@app/auth/module/authorization.module";

@Module({
  imports: [AuthenticationModule, AuthorizationModule],
  exports: [],
})
export class AuthModule {}
