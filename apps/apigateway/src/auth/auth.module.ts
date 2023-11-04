import { Logger, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import * as config from "config";
import { JwtStrategy } from "./guards/jwt.strategy";
import { WsJwtGuard } from "./guards/auth.wsjwtguard";
import { HttpModule } from "@nestjs/axios";
import { JwtGoogleStrategy } from "@src/auth/guards/oauth/google.strategy";
import { JwtKakaoStrategy } from "@src/auth/guards/oauth/kakao.strategy";
import { JwtNaverStrategy } from "@src/auth/guards/oauth/naver.strategy";
import { JwtGuard } from "@src/auth/guards/auth.jwt.guard";
import { ClientCustomProxyModule } from "@app/common/module/clientcustomproxy.module";
import { AUTHENTICATION_SERVICE } from "@app/common/message/authentication";
import { Transport } from "@nestjs/microservices";
import {
  AUTHENTICATION_HOST,
  AUTHENTICATION_PORT,
  AUTHORIZAION_HOST,
  AUTHORIZAION_PORT,
} from "@app/common/config";
import { AUTHORIZATION_SERVICE } from "@app/common/message/authorization";

const jwtConstants = config.get("jwt");

@Module({
  imports: [
    ClientCustomProxyModule.register({
      clients: [
        {
          name: AUTHENTICATION_SERVICE,
          config: {
            transport: Transport.TCP,
            options: { host: AUTHENTICATION_HOST, port: AUTHENTICATION_PORT },
          },
        },
        {
          name: AUTHORIZATION_SERVICE,
          config: {
            transport: Transport.TCP,
            options: { host: AUTHORIZAION_HOST, port: AUTHORIZAION_PORT },
          },
        },
      ],
    }),
    HttpModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtGuard,
    Logger,
    JwtGoogleStrategy,
    JwtKakaoStrategy,
    JwtNaverStrategy,
  ],
  exports: [JwtGuard],
})
export class AuthModule {}
