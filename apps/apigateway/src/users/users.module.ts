import { Logger, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { User } from "@app/common/entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, Logger],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
