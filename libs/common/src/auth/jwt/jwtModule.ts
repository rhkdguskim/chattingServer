import { Module } from "@nestjs/common";
import { JWT_SERVICE } from "@app/authorization/authorization.metadata";
import { JWT_EXPIRE_IN, JWT_SECRET } from "@app/common/config";
import { CommonJwtService } from "@app/common/auth/jwt/common.jwtService";

@Module({
  providers: [
    {
      provide: JWT_SERVICE,
      useValue: new CommonJwtService({
        secret: JWT_SECRET,
        expire_in: JWT_EXPIRE_IN,
      }),
    },
  ],
  exports: [JWT_SERVICE],
})
export class JwtModule {}
