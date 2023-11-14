import { Logger, Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { DatabaseModule } from "@app/common/module";
import { UserTypeORM } from "@app/common/entity/typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./users.repository";
import { AuthenticationDomain } from "./authentication.domain";

@Module({
  imports: [DatabaseModule(), TypeOrmModule.forFeature([UserTypeORM])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthenticationDomain, UserRepository, Logger],
})
export class AuthenticationModule {}
