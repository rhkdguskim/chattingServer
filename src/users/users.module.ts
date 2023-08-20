import { forwardRef, Logger, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/users.entity";
import { UsersController } from "./users.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([User])],

  providers: [UsersService, Logger],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
