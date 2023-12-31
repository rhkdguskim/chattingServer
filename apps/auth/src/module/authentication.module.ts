import { Logger, Module } from "@nestjs/common";
import { AuthenticationServiceModule } from "./authentication.service.module";
import { AuthenticationControllerImpl } from "@app/auth/controller/authentication.controller";

@Module({
  imports: [AuthenticationServiceModule],
  controllers: [AuthenticationControllerImpl],
  providers: [Logger],
})
export class AuthenticationModule {}
