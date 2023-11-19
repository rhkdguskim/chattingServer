import { DynamicModule, Logger, Module } from "@nestjs/common";
import { AuthenticationMicroServiceTCPController } from "./authentication.microservice.tcp.controller";
import { typeOrmConfig } from "@app/common/module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthenticationServiceMoudle } from "./authentication.service.module";

export interface AuthenticationModuleConfig {
  isDev: boolean;
  isMicroService: boolean;
}
@Module({})
export class AuthenticationModule {
  static forRoot(config: AuthenticationModuleConfig): DynamicModule {
    const AuthenticationController = AuthenticationMicroServiceTCPController;

    return {
      module: AuthenticationModule,
      imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthenticationServiceMoudle.forRoot({ isDev: false }),
      ],
      controllers: [AuthenticationController],
      providers: [Logger],
    };
  }
}
