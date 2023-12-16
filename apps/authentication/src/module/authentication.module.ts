import { DynamicModule, Logger, Module } from "@nestjs/common";
import { AuthenticationControllerMicroservice } from "../controller/authentication.controller.microservice";
import { typeOrmConfig } from "@app/common/module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthenticationServiceModule } from "./authentication.service.module";

export interface AuthenticationModuleConfig {
  isDev: boolean;
  isMicroService: boolean;
}
@Module({})
export class AuthenticationModule {
  static forRoot(config: AuthenticationModuleConfig): DynamicModule {
    const AuthenticationController = AuthenticationControllerMicroservice;

    return {
      module: AuthenticationModule,
      imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthenticationServiceModule.forRoot({ isDev: false, isGlobal : false }),
      ],
      controllers: [AuthenticationController],
      providers: [Logger],
    };
  }
}
