import { Module } from "@nestjs/common";
import { AuthenticationServiceModule } from "@app/authentication/module/authentication.service.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "@app/common/module";
import { AuthenticationControllerImpl } from "@app/authentication/controller/authentication.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthenticationServiceModule.forRoot(),
  ],
  controllers: [AuthenticationControllerImpl],
})
export class AuthenticationTestModule {}
