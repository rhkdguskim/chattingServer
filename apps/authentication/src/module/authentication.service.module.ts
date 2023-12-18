import { DynamicModule, Module } from "@nestjs/common";
import { AuthenticationLocalService } from "../providers/authentication.local.service";
import { UserTypeORMRepository } from "../repository/users.typeorm.repository";
import { NodeBcryptService } from "../providers/bcrypt/bcrpy.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {AUTHENTICATION_BCRYPT, AUTHENTICATION_SERVICE, USER_REPOSITORY} from "../authentication.metadata";
import {UserTypeORM} from "@app/common/typeorm/entity/users.typeorm.entity";
import {JwtModule} from "@app/common/auth/jwtModule";

export interface AuthenticationServiceModuleConfig {
  isDev: boolean;
  isGlobal : boolean;
}

@Module({})
export class AuthenticationServiceModule {
  static forRoot(config: AuthenticationServiceModuleConfig): DynamicModule {
    const module: DynamicModule = {
      module : AuthenticationServiceModule,
      imports: [JwtModule, TypeOrmModule.forFeature([UserTypeORM])],
      providers: [
        {
          provide: USER_REPOSITORY,
          useClass: UserTypeORMRepository,
        },
        {
          provide: AUTHENTICATION_SERVICE,
          useClass: AuthenticationLocalService,
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
