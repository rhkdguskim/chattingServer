import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import {DatabaseModule, Friend, User} from "@app/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersService} from "./users.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    DatabaseModule(),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: "test",
      signOptions: { expiresIn: 3600 },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UsersService],
})
export class AuthenticationModule {}
