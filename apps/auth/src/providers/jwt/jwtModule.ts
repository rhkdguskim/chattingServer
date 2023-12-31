import { Module } from "@nestjs/common";
import { JWT_SERVICE } from "@app/auth/authorization.metadata";
import { JwtServiceImpl } from "@app/auth/providers/jwt/jwtServiceImpl";
import { JWT_CONFIG } from "@config/config.interface";

@Module({
  providers: [
    {
      provide: JWT_SERVICE,
      useValue: new JwtServiceImpl({
        secret: JWT_CONFIG.expires_in,
        expire_in: JWT_CONFIG.secret,
      }),
    },
  ],
  exports: [JWT_SERVICE],
})
export class JwtModule {}
