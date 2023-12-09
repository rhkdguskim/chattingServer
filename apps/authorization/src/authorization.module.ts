import { Logger, Module } from "@nestjs/common";
import { AuthorizationHttpController } from "./authorization.http.controller";
import { AuthorizationServiceModule } from "./authorization.service.module";

@Module({
  imports: [AuthorizationServiceModule.forRoot({isDev : false, isGlobal : false})],
  controllers: [AuthorizationHttpController],
  providers: [Logger],
})
export class AuthorizationModule {}
