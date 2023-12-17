import {DynamicModule, Logger, Module} from "@nestjs/common";
import { AuthorizationMicroserviceController } from "../controller/authorization.microservice.controller";
import { AuthorizationServiceModule } from "./authorization.service.module";
import {AuthorizationHttpController} from "../controller/authorization.http.controller";
import {JwtGuard} from "@app/authorization/guards/authorization.jwt.guard";


export interface AuthorizationModuleConfig {
  isDev: boolean;
  isMicroService: boolean;
  isGlobal : boolean;
}

@Module({})
export class AuthorizationModule {
  static forRoot(config : AuthorizationModuleConfig) : DynamicModule {
    const AuthorizationController = config.isMicroService ? AuthorizationMicroserviceController : AuthorizationHttpController;
    return {
      module: AuthorizationModule,
      global: config.isGlobal,
      imports: [AuthorizationServiceModule.forRoot({isDev : config.isDev, isGlobal : config.isGlobal})],
      controllers: [AuthorizationController],
      providers: [Logger, JwtGuard],
      exports:[JwtGuard]
    };
  }

}
