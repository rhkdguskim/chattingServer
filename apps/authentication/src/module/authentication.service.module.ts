import { DynamicModule, Module } from "@nestjs/common";
import { AuthenticationServiceImpl } from "../providers/authentication.service";
import { UserTypeORMRepository } from "../repository/users.typeorm.repository";
import { NodeBcryptService } from "../providers/bcrypt/bcrpy.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  AUTHENTICATION_BCRYPT,
  AUTHENTICATION_SERVICE,
  USER_REPOSITORY,
} from "../authentication.metadata";
import { UserTypeORM } from "@app/common/typeorm/entity/users.typeorm.entity";
import { JwtModule } from "@app/common/auth/jwtModule";

@Module({})
export class AuthenticationServiceModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthenticationServiceModule,
      imports: [JwtModule, TypeOrmModule.forFeature([UserTypeORM])],
      providers: [
        {
          provide: USER_REPOSITORY,
          useClass: UserTypeORMRepository,
        },
        {
          provide: AUTHENTICATION_SERVICE,
          useClass: AuthenticationServiceImpl,
        },
        {
          provide: AUTHENTICATION_BCRYPT,
          useClass: NodeBcryptService,
        },
      ],
      exports: [AUTHENTICATION_BCRYPT, AUTHENTICATION_SERVICE, USER_REPOSITORY],
    };
  }
}
