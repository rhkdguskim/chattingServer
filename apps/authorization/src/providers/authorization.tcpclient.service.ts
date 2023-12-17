import { ClientTCP, TcpClientOptions } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import {JWTRequest, JWTResponse, TokenResponse} from "../dto/authorization.dto";
import {JWT_SIGN, JWT_VERIFY} from "../authorization.message";
import {AuthorizationService} from "./authorization.service.interface";

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
    sign(payload: JWTRequest): Promise<TokenResponse> {
      return lastValueFrom<TokenResponse>(
          this.clientAdaptor.send<TokenResponse>({ cmd: JWT_SIGN }, payload)
      );
    }
}
