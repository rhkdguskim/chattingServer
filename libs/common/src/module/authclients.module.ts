import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import {
  AUTHENTICATION_HOST,
  AUTHENTICATION_PORT,
  AUTHORIZAION_HOST,
  AUTHORIZAION_PORT,
} from "@app/common/config";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "AUTHENTICATION_SERVICE",
        transport: Transport.TCP,
        options: { host: AUTHENTICATION_HOST, port: AUTHENTICATION_PORT },
      },
      {
        name: "AUTHORIZATION_SERVICE",
        transport: Transport.TCP,
        options: { host: AUTHORIZAION_HOST, port: AUTHORIZAION_PORT },
      },
      // 다른 서비스도 필요한 경우 추가
    ]),
  ],
  exports: [ClientsModule],
})
export class AuthClientsModule {}
