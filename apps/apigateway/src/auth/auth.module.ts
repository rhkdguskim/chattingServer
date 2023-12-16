import { Logger, Module } from "@nestjs/common";
import { JwtGoogleStrategy } from "../../../authorization/src/guards/passport/oauth.google.strategy";
import { JwtKakaoStrategy } from "../../../authorization/src/guards/passport/oauth.kakao.strategy";
import { JwtNaverStrategy } from "../../../authorization/src/guards/passport/oauth.naver.strategy";
import { JwtGuard } from "../../../authorization/src/guards/authorization.jwt.guard";
import {AuthenticationLocalService} from "@app/authentication/providers/authentication.local.service";
import {AuthenticationControllerHttp} from "@app/authentication/controller/authentication.controller.http";


@Module({
  imports: [],
  controllers: [AuthenticationControllerHttp],
  providers: [
    AuthenticationLocalService,
    JwtGuard,
    Logger,
    JwtGoogleStrategy,
    JwtKakaoStrategy,
    JwtNaverStrategy,
  ],
  exports: [JwtGuard],
})
export class AuthModule {}
