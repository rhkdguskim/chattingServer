import { DynamicModule, Logger, Module } from "@nestjs/common";
import { AuthenticationMicroServiceTCPController } from "./authentication.microservice.tcp.controller";
import { AuthenticationServiceImpl } from "./authentication.service";
import { typeOrmConfig } from "@app/common/module";
import { UserTypeORM } from "@app/common/typeorm/entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTypeORMRepository } from "../../../libs/common/src/typeorm/repository/users.typeorm.repository";
import { AuthenticationBcrypt } from "./authentication.bcrpy";
import {
  AUTHENTICATION_BCRPY,
  AUTHENTICATION_SERVICE,
  USER_REPOSITORY,
} from "apps/authentication/src/authentication.interface";
import { AuthenticationMockService } from "./test/authentication.mock.service";
import { UserMockRepository } from "./test/users.mock.repository";

export interface AuthenticationModuleConfig {
  isDev: boolean;
  isMicroService: boolean;
}
@Module({})
export class AuthenticationModule {
  static forRoot(config: AuthenticationModuleConfig): DynamicModule {
    const authenticationServiceProvider = {
      provide: AUTHENTICATION_SERVICE,
      useClass: config.isDev
        ? AuthenticationMockService
        : AuthenticationServiceImpl,
    };

    const userRepositoryProvider = {
      provide: USER_REPOSITORY,
      useClass: config.isDev ? UserMockRepository : UserTypeORMRepository,
    };

    const AuthenticationController = AuthenticationMicroServiceTCPController;

    return {
      module: AuthenticationModule,
      imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([UserTypeORM]),
      ],
      controllers: [AuthenticationController],
      providers: [
        authenticationServiceProvider,
        userRepositoryProvider,
        {
          provide : AUTHENTICATION_BCRPY,
          useClass : AuthenticationBcrypt
        },
        Logger,
      ],
    };
  }
}
