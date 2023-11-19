import { Logger, Module } from "@nestjs/common";
import { AuthorizationController } from "./authorization.controller";
import { AuthorizationServiceModule } from "./authorization.service.module";

@Module({
  imports: [AuthorizationServiceModule.forRoot({isDev : false})],
  controllers: [AuthorizationController],
  providers: [Logger],
})
export class AuthorizationModule {}
