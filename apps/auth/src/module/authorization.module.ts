import { Logger, Module } from "@nestjs/common";
import { AuthorizationServiceModule } from "./authorization.service.module";
import { JwtGuard } from "@app/auth/guard/authorization.jwt.guard";

@Module({
  imports: [AuthorizationServiceModule],
  providers: [Logger, JwtGuard],
  exports: [JwtGuard],
})
export class AuthorizationModule {}
