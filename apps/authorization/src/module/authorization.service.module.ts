import { Global, Module } from "@nestjs/common";
import { AUTHORIZATION_SERVICE } from "../authorization.metadata";
import { AuthorizationServiceImpl } from "../providers/authorization.service";
import { JwtModule } from "@app/common/auth/jwt/jwtModule";

@Global()
@Module({
  imports: [JwtModule],
  providers: [
    {
      provide: AUTHORIZATION_SERVICE,
      useClass: AuthorizationServiceImpl,
    },
  ],
  exports: [AUTHORIZATION_SERVICE],
})
export class AuthorizationServiceModule {}
