import { DynamicModule, Module } from "@nestjs/common";
import { AUTHORIZATION_SERVICE } from "../authorization.metadata";
import { AuthorizationServiceImpl } from "../providers/authorization.service";
import { JwtModule } from "@app/common/auth/jwtModule";

export interface AuthorizationServiceModuleConfig {
  isDev: boolean;
  isGlobal: boolean;
}

@Module({})
export class AuthorizationServiceModule {
  static forRoot(config?: AuthorizationServiceModuleConfig): DynamicModule {
    const module: DynamicModule = {
      module: AuthorizationServiceModule,
      imports: [JwtModule],
      providers: [
        {
          provide: AUTHORIZATION_SERVICE,
          useClass: AuthorizationServiceImpl,
        },
      ],
      exports: [AUTHORIZATION_SERVICE],
    };

    if (config.isGlobal) {
      module.global = true;
    }
    return module;
  }
}
