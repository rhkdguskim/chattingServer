import { Logger, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import * as config from "config";
import { JwtStrategy } from "./guards/jwt.strategy";
import { WsJwtGuard } from "./guards/auth.wsjwtguard";
import { HttpModule } from "@nestjs/axios";
import { JwtGoogleStrategy } from "@src/auth/guards/oauth/google.strategy";
import { JwtKakaoStrategy } from "@src/auth/guards/oauth/kakao.strategy";
import { JwtNaverStrategy } from "@src/auth/guards/oauth/naver.strategy";

const jwtConstants = config.get("jwt");

@Module({
  imports: [
    HttpModule,
    PassportModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    WsJwtGuard,
    Logger,
    JwtGoogleStrategy,
    JwtKakaoStrategy,
    JwtNaverStrategy,
  ],
  exports: [JwtStrategy, WsJwtGuard],
})
export class AuthModule {}
