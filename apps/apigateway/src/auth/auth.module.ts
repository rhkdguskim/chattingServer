import { Logger, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import * as config from "config";
import { HttpModule } from "@nestjs/axios";
import { JwtGoogleStrategy } from "@src/auth/guards/oauth/google.strategy";
import { JwtKakaoStrategy } from "@src/auth/guards/oauth/kakao.strategy";
import { JwtNaverStrategy } from "@src/auth/guards/oauth/naver.strategy";
import { JwtGuard } from "@src/auth/guards/auth.jwt.guard";

@Module({
  imports: [HttpModule, PassportModule],
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
