import { DynamicModule, Module } from "@nestjs/common";
import { FRIEND_REPOSITORY } from "../friend.metadata";
import { FriendTypeORMRepository } from "../repository/friend.typeorm.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FRIEND_SERVICE } from "../friend.message";
import { FriendLocalService } from "../providers/friend.local.service";
import {FriendTypeORM} from "@app/common/typeorm/entity/friend.typeorm.entity";
import {UserTypeORM} from "@app/common/typeorm/entity/users.typeorm.entity";
import {USER_REPOSITORY} from "@app/authentication/authentication.metadata";
import {UserTypeORMRepository} from "@app/authentication/repository/users.typeorm.repository";


export interface FriendServiceModuleConfig {
    isDev: boolean;
    isGlobal : boolean;
  }

@Module({})
export class FriendServiceModule {
    static forRoot(config :FriendServiceModuleConfig) : DynamicModule {
        const module: DynamicModule = {
            module : FriendServiceModule,
            imports: [TypeOrmModule.forFeature([UserTypeORM, FriendTypeORM])],
            providers: [
            {
                provide: FRIEND_REPOSITORY,
                useClass: FriendTypeORMRepository,
            },
            {
              provide : USER_REPOSITORY,
              useClass : UserTypeORMRepository,
            },
            {
                provide: FRIEND_SERVICE,
                useClass: FriendLocalService
            },
            ],
            exports: [FRIEND_SERVICE]
        };

        if (config.isGlobal) {
            module.global = true
        }
        return module;
    };
}