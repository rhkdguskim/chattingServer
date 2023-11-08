import { Logger, Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { DatabaseModule } from "@app/common/module";
import { User } from "@app/common/entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./users.repository";
import { AuthenticationDomain } from "./authentication.domain";

@Module({
  imports: [DatabaseModule(), TypeOrmModule.forFeature([User])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthenticationDomain, UserRepository, Logger],
})
export class AuthenticationModule {}
