import { ClientTCP, TcpClientOptions } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import {JWTRequest, JWTResponse} from "../dto/authorization.dto";
import {JWT_SIGN, JWT_VERIFY} from "../authorization.message";
import {AuthorizationService} from "./authorization.service.interface";
import {LoginResponse} from "@app/authentication/dto/authenticaion.dto";

export class AuthorizationTCPClient
  implements AuthorizationService
{
  private clientAdaptor : ClientTCP
  constructor(options: TcpClientOptions) {
    this.clientAdaptor = new ClientTCP(options['options'])
  }

  verify(payload: string): Promise<JWTResponse> {
    return lastValueFrom<JWTResponse>(
        this.clientAdaptor.send<JWTResponse>({ cmd: JWT_VERIFY }, payload)
    );
    }
    sign(payload: JWTRequest): Promise<LoginResponse> {
      return lastValueFrom<LoginResponse>(
          this.clientAdaptor.send<LoginResponse>({ cmd: JWT_SIGN }, payload)
      );
    }
}
