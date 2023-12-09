import { DynamicModule, Module } from "@nestjs/common";
import { AuthenticationMockService } from "./test/authentication.mock.service";
import { AuthenticationServiceImpl } from "./authentication.service";
import {
  AUTHENTICATION_BCRPY,
  AUTHENTICATION_SERVICE,
  USER_REPOSITORY,
} from "./authentication.interface";
import { UserMockRepository } from "./test/users.mock.repository";
import { UserTypeORMRepository } from "@app/common/typeorm/repository/users.typeorm.repository";
import { AuthenticationBcrypt } from "./authentication.bcrpy";
import { UserTypeORM } from "@app/common/typeorm/entity";
import { TypeOrmModule } from "@nestjs/typeorm";

export interface AuthenticationServiceModuleConfig {
  isDev: boolean;
  isGlobal : boolean;
}

@Module({})
export class AuthenticationServiceMoudle {
  static forRoot(config: AuthenticationServiceModuleConfig): DynamicModule {
    const module: DynamicModule = {
      module : AuthenticationServiceMoudle,
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
            : AuthenticationServiceImpl,
        },
        {
          provide: AUTHENTICATION_BCRPY,
          useClass: AuthenticationBcrypt,
        },
      ],
      exports: [AUTHENTICATION_BCRPY, AUTHENTICATION_SERVICE, USER_REPOSITORY]
    };
    if (config.isGlobal) {
      module.global = true
    }
    return module;
  };
}
