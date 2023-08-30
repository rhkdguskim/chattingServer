import { Logger, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import * as config from "config";
import { JwtStrategy } from "./jwt.strategy";
import { WsJwtGuard } from "./auth.wsjwtguard";
import { HttpModule } from "@nestjs/axios";
import { JwtGoogleStrategy } from "@src/auth/google.strategy";
import { JwtKakaoStrategy } from "@src/auth/kakao.strategy";
import { JwtNaverStrategy } from "@src/auth/naver.strategy";

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
  providers: [AuthService,
              JwtStrategy,
              WsJwtGuard,
              Logger,
              JwtGoogleStrategy, //google소셜로그인
              JwtKakaoStrategy, //naver소셜로그인
              JwtNaverStrategy, //kakao소셜로그인
            ],
  exports: [JwtStrategy, WsJwtGuard],
})
export class AuthModule {}
