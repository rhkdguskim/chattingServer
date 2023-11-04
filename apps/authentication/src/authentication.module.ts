import { Logger, Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { DatabaseModule } from "@app/common/module";
import { User } from "@app/common/entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";

@Module({
  imports: [DatabaseModule(), TypeOrmModule.forFeature([User])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UsersService, Logger],
})
export class AuthenticationModule {}
