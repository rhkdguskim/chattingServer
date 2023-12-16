import { DynamicModule, Module } from "@nestjs/common";
import { AuthenticationMockService } from "../test/authentication.mock.service";
import { AuthenticationServiceLocal } from "../providers/authentication-service-local.service";
import { UserMockRepository } from "../test/users.mock.repository";
import { UserTypeORMRepository } from "../repository/users.typeorm.repository";
import { NodeBcryptService } from "../providers/bcrypt/bcrpy.service";
import { UserTypeORM } from "@app/common/typeorm/entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import {AUTHENTICATION_BCRYPT, AUTHENTICATION_SERVICE, USER_REPOSITORY} from "../authentication.metadata";

export interface AuthenticationServiceModuleConfig {
  isDev: boolean;
  isGlobal : boolean;
}

@Module({})
export class AuthenticationServiceModule {
  static forRoot(config: AuthenticationServiceModuleConfig): DynamicModule {
    const module: DynamicModule = {
      module : AuthenticationServiceModule,
      imports: [TypeOrmModule.forFeature([UserTypeORM])],
      providers: [
        {
          provide: USER_REPOSITORY,
          useClass: config.isDev ? UserMockRepository : UserTypeORMRepository,
        },
        {
          provide: AUTHENTICATION_SERVICE,
          useClass: config.isDev
            ? AuthenticationMockService
            : AuthenticationServiceLocal,
        },
        {
          provide: AUTHENTICATION_BCRYPT,
          useClass: NodeBcryptService,
        },
      ],
      exports: [AUTHENTICATION_BCRYPT, AUTHENTICATION_SERVICE, USER_REPOSITORY]
    };
    if (config.isGlobal) {
      module.global = true
    }
    return module;
  };
}
