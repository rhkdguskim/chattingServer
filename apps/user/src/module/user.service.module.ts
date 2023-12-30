import { Module } from "@nestjs/common";
import {
  FRIEND_REPOSITORY,
  FRIEND_SERVICE,
  USER_REPOSITORY,
  USER_SERVICE,
} from "../user.metadata";
import { FriendTypeORMRepository } from "../repository/friend.typeorm.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FriendServiceImpl } from "../providers/friend.service";
import { FriendTypeORM } from "@app/common/typeorm/entity/friend.typeorm.entity";
import { UserTypeORM } from "@app/common/typeorm/entity/users.typeorm.entity";
import { BCRYPT_SERVICE } from "@app/authentication/authentication.metadata";
import { UserTypeORMRepository } from "@app/user/repository/users.typeorm.repository";
import { UserServiceImpl } from "@app/user/providers/user.service";
import { BcryptServiceImpl } from "@app/common/auth/bcrypt/bcrpy.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeORM, FriendTypeORM])],
  providers: [
    {
      provide: FRIEND_REPOSITORY,
      useClass: FriendTypeORMRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserTypeORMRepository,
    },
    {
      provide: FRIEND_SERVICE,
      useClass: FriendServiceImpl,
    },
    {
      provide: USER_SERVICE,
      useClass: UserServiceImpl,
    },
    {
      provide: BCRYPT_SERVICE,
      useClass: BcryptServiceImpl,
    },
  ],
  exports: [FRIEND_SERVICE, USER_SERVICE],
})
export class UserServiceModule {}
