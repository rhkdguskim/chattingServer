import { Logger, Module } from "@nestjs/common";
import { AuthorizationMicroserviceController } from "../controller/authorization.microservice.controller";
import { AuthorizationServiceModule } from "./authorization.service.module";

@Module({
  imports: [AuthorizationServiceModule.forRoot({isDev : false, isGlobal : false})],
  controllers: [AuthorizationMicroserviceController],
  providers: [Logger],
})
export class AuthorizationModule {}
