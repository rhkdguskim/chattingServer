import { Module } from "@nestjs/common";
import { AuthenticationServiceImpl } from "../providers/authentication.service";
import { UserTypeORMRepository } from "@app/user/repository/users.typeorm.repository";
import { BcryptServiceImpl } from "@app/auth/providers/bcrypt/bcrpy.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  AUTHENTICATION_SERVICE,
  BCRYPT_SERVICE,
} from "../authentication.metadata";
import { UserTypeORM } from "@app/common/typeorm/entity/users.typeorm.entity";
import { JwtModule } from "@app/auth/providers/jwt/jwtModule";
import { USER_REPOSITORY } from "@app/user/user.metadata";

@Module({
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
      provide: BCRYPT_SERVICE,
      useClass: BcryptServiceImpl,
    },
  ],
  exports: [BCRYPT_SERVICE, AUTHENTICATION_SERVICE, USER_REPOSITORY],
})
export class AuthenticationServiceModule {}
