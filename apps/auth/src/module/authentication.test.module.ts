import { Module } from "@nestjs/common";
import { AuthenticationServiceModule } from "@app/auth/module/authentication.service.module";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthenticationControllerImpl } from "@app/auth/controller/authentication.controller";
import { typeOrmConfig } from "@lib/common/database/typeorm.config";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig as DataSourceOptions),
    AuthenticationServiceModule,
  ],
  controllers: [AuthenticationControllerImpl],
})
export class AuthenticationTestModule {}
