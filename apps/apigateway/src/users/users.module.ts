import { Logger, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { AuthClientsModule } from "@app/common/module/authclients.module";
import { User } from "@app/common/entity";

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthClientsModule],
  providers: [UsersService, Logger],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
