import { DynamicModule, Logger, Module } from "@nestjs/common";
import { AuthorizationServiceModule } from "./authorization.service.module";
import { JwtGuard } from "@app/authorization/guards/authorization.jwt.guard";

export interface AuthorizationModuleConfig {
  isDev: boolean;
  isMicroService: boolean;
  isGlobal: boolean;
}

@Module({})
export class AuthorizationModule {
  static forRoot(config: AuthorizationModuleConfig): DynamicModule {
    return {
      module: AuthorizationModule,
      global: config.isGlobal,
      imports: [
        AuthorizationServiceModule.forRoot({
          isDev: config.isDev,
          isGlobal: config.isGlobal,
        }),
      ],
      controllers: [],
      providers: [Logger, JwtGuard],
      exports: [JwtGuard],
    };
  }
}
