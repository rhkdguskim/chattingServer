import { DynamicModule, Logger, Module } from "@nestjs/common";
import { AuthenticationControllerMicroservice } from "../controller/authentication.controller.microservice";
import { typeOrmConfig } from "@app/common/module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthenticationServiceModule } from "./authentication.service.module";
import {AuthenticationControllerHttp} from "@app/authentication/controller/authentication.controller.http";
import {UsersMicroServiceController} from "@app/authentication/controller/user.controller.microservice";
import {UsersHttpController} from "@app/authentication/controller/user.controller.http";

export interface AuthenticationModuleConfig {
  isDev: boolean;
  isMicroService: boolean;
}
@Module({})
export class AuthenticationModule {
  static forRoot(config: AuthenticationModuleConfig): DynamicModule {
    const AuthenticationController = config.isMicroService ? AuthenticationControllerMicroservice : AuthenticationControllerHttp;
    const UserController = config.isMicroService ? UsersMicroServiceController : UsersHttpController
    return {
      module: AuthenticationModule,
      imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthenticationServiceModule.forRoot({ isDev: false, isGlobal : false }),
      ],
      controllers: [AuthenticationController, UserController],
      providers: [Logger],
    };
  }
}
