import { Logger, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { ClientCustomProxyModule } from "@app/common/module/clientcustomproxy.module";
import { User } from "@app/common/entity";
import {
  AUTHENTICATION_HOST,
  AUTHENTICATION_PORT,
  AUTHORIZAION_HOST,
  AUTHORIZAION_PORT,
} from "@app/common/config";
import { AUTHENTICATION_SERVICE } from "@app/common/message/authentication";
import { AUTHORIZATION_SERVICE } from "@app/common/message/authorization";
import { Transport } from "@nestjs/microservices";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ClientCustomProxyModule.register({
      clients: [
        {
          name: AUTHENTICATION_SERVICE,
          config: {
            transport: Transport.TCP,
            options: { host: AUTHENTICATION_HOST, port: AUTHENTICATION_PORT },
          },
        },
        {
          name: AUTHORIZATION_SERVICE,
          config: {
            transport: Transport.TCP,
            options: { host: AUTHORIZAION_HOST, port: AUTHORIZAION_PORT },
          },
        },
      ],
    }),
  ],
  providers: [UsersService, Logger],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
