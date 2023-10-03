import {Logger, Module} from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { DatabaseModule} from "@app/common/module";
import { User} from "@app/common/entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersService} from "./users.service";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AUTHORIZATION_SERVICE} from "@app/common/message/authorization";

@Module({
  imports: [
    ClientsModule.register([
      {name : AUTHORIZATION_SERVICE, transport : Transport.TCP, options : {host : "127.0.0.1", port : 3002}}
    ]),
    DatabaseModule(),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UsersService, Logger],
})
export class AuthenticationModule {}
