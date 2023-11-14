import { Logger, Module } from "@nestjs/common";
import { AuthorizationController } from "./authorization.controller";
import { AuthorizationService } from "./authorization.service";
import { JwtModule } from "@nestjs/jwt";
import { JWT_EXPIREIN, JWT_SECRET } from "@app/common/config";
import { HttpService } from "@nestjs/axios";
import { OauthServiceFactory } from "./oauth.factory.service";

@Module({
  imports: [
    HttpService,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIREIN },
    }),
  ],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, OauthServiceFactory, Logger],
})
export class AuthorizationModule {}
