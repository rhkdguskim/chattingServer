import { DynamicModule, Module } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE,
  JWT_SERVICE,
  KAKAO_OAUTH,
  OAUTH_FACTORY_SERVICE,
} from "../authorization.metadata";
import { AuthorizationLocalService } from "../providers/authorization.local.service";
import { JwtService } from "@nestjs/jwt";
import { JWT_EXPIREIN, JWT_SECRET } from "@app/common/config";
import { HttpService } from "@nestjs/axios";
import axios from "axios";
import {
  OauthServiceFactoryConfig,
  OauthServiceFactory,
} from "../providers/oauth.factory.service";
import { KakaoOAuthService } from "../providers/oauth.service";

export interface AuthorizationServiceModuleConfig {
  isDev: boolean;
  isGlobal : boolean;
}

@Module({})
export class AuthorizationServiceModule {
  static forRoot(config: AuthorizationServiceModuleConfig): DynamicModule {
    const module : DynamicModule = {
      module: AuthorizationServiceModule,
      imports: [],
      providers: [
        {
            provide: JWT_SERVICE,
            useValue: new JwtService({
              global: true,
              secret: JWT_SECRET,
              signOptions: { expiresIn: JWT_EXPIREIN },
            }),
        },
        {
            provide: OAUTH_FACTORY_SERVICE,
            useFactory: (kakaoService) => {
              let config: OauthServiceFactoryConfig = { oauthServices: [] };
              config.oauthServices.push({
                name: KAKAO_OAUTH,
                instance: kakaoService,
              });
              return new OauthServiceFactory(config);
            },
            inject: [KAKAO_OAUTH],
          },
        {
          provide: AUTHORIZATION_SERVICE,
          useClass: AuthorizationLocalService,
        },
        {
          provide: KAKAO_OAUTH,
          useValue: new KakaoOAuthService(
            new HttpService(
              axios.create({
                headers: {
                  "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8",
                },
              })
            )
          ),
        },
      ],
      exports: [AUTHORIZATION_SERVICE, OAUTH_FACTORY_SERVICE]
    };

    if (config.isGlobal) {
      module.global = true
    }

    return module;
  }
}
