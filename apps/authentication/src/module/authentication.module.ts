import { DynamicModule, Logger, Module } from "@nestjs/common";
import { typeOrmConfig } from "@app/common/module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthenticationServiceModule } from "./authentication.service.module";
import { AuthenticationControllerImpl } from "@app/authentication/controller/authentication.controller";
import { UsersControllerImpl } from "@app/authentication/controller/user.controller";

export interface AuthenticationModuleConfig {
  isDev: boolean;
  isMicroService: boolean;
}
@Module({})
export class AuthenticationModule {
  static forRoot(config: AuthenticationModuleConfig): DynamicModule {
    const AuthenticationController = AuthenticationControllerImpl;
    const UserController = UsersControllerImpl;
    return {
      module: AuthenticationModule,
      imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthenticationServiceModule.forRoot(),
      ],
      controllers: [AuthenticationController, UserController],
      providers: [Logger],
    };
  }
}
