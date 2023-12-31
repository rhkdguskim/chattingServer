import { Global, Module } from "@nestjs/common";
import { AUTHORIZATION_SERVICE } from "@app/auth/authorization.metadata";
import { AuthorizationServiceImpl } from "@app/auth/providers/authorization.service";
import { JwtModule } from "@app/auth/providers/jwt/jwtModule";

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
