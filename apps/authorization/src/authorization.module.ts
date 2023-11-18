import { Logger, Module } from "@nestjs/common";
import { AuthorizationController } from "./authorization.controller";
import { AuthorizationServiceImpl } from "./authorization.service";
import { JwtService } from "@nestjs/jwt";
import { JWT_EXPIREIN, JWT_SECRET } from "@app/common/config";
import { HttpService } from "@nestjs/axios";
import {
  OauthServiceFactory,
  OauthServiceFactoryConfig,
} from "./oauth.factory.service";
import {
  AUTHORIZATION_SERVICE,
  HTTP_SERVICE,
  JWT_SERVICE,
  KAKAO_OAUTH,
  OAUTH_FACTORY_SERVICE,
} from "./authorization.interface";
import axios, { AxiosInstance } from "axios";
import { KakaoOAuthService } from "./oauth.service";

@Module({
  imports: [],
  controllers: [AuthorizationController],
  providers: [
    {
      provide: AUTHORIZATION_SERVICE,
      useClass: AuthorizationServiceImpl,
    },
    {
      provide: JWT_SERVICE,
      useValue: new JwtService({
        global: true,
        secret: JWT_SECRET,
        signOptions: { expiresIn: JWT_EXPIREIN },
      }),
    },
    {
      provide: KAKAO_OAUTH,
      useValue: new KakaoOAuthService(
        new HttpService(
          axios.create({
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          })
        )
      ),
    },
    {
      provide: OAUTH_FACTORY_SERVICE,
      useFactory: (kakaoService, naverService) => {
        let config: OauthServiceFactoryConfig = { oauthServices: [] };
        config.oauthServices.push({
          name: KAKAO_OAUTH,
          instance: kakaoService,
        });
        return new OauthServiceFactory(config);
      },
      inject: [KAKAO_OAUTH],
    },
    AuthorizationServiceImpl,
    Logger,
  ],
})
export class AuthorizationModule {}
