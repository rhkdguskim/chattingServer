import { DynamicModule, Module } from "@nestjs/common";
import { FRIEND_REPOSITORY } from "./friend.interface";
import { FriendTypeORMRepository } from "@app/common/typeorm/repository/friend.typeorm.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendTypeORM } from "@app/common/typeorm/entity";
import { FRIEND_SERVICE } from "@app/common/message/friend";
import { FriendServiceImpl } from "./friend.service";


export interface FriendServiceModuleConfig {
    isDev: boolean;
    isGlobal : boolean;
  }

@Module({})
export class FriendServiceModule {
    static forRoot(config :FriendServiceModuleConfig) : DynamicModule {
        const module: DynamicModule = {
            module : FriendServiceModule,
            imports: [TypeOrmModule.forFeature([FriendTypeORM])],
            providers: [
            {
                provide: FRIEND_REPOSITORY,
                useClass: FriendTypeORMRepository,
            },
            {
                provide: FRIEND_SERVICE,
                useClass: FriendServiceImpl
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