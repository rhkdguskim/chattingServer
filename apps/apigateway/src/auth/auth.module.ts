import { Module } from "@nestjs/common";
import {AuthenticationModule} from "@app/authentication/module/authentication.module";
import {AuthorizationModule} from "@app/authorization/module/authorization.module";

@Module({
  imports: [
      AuthenticationModule.forRoot({isDev:false, isMicroService : false}),
      AuthorizationModule.forRoot({isDev : false, isMicroService : false, isGlobal: true})],
  exports: [],
})
export class AuthModule {}